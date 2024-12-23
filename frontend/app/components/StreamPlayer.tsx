'use client';
import React, { useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import { io } from 'socket.io-client';
import { useBroadCastStore } from '../store/useBroadCastStore';
import useStreamerStore from '../store/useStreamerStore';

interface StreamPlayerProps {
  isBroadcastMode?: boolean; // 내가 방송하기 모드 여부
  streamUrl?: string; // HLS URL (스트리머 방송 보기 모드에서 사용)
  streamType?: string;// 스트림 플렛폼 종류(치지직, 유튜브 등)
}

const StreamPlayer: React.FC<StreamPlayerProps> = ({ isBroadcastMode, streamUrl, streamType }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const socket = io(process.env.NEXT_PUBLIC_BACK_URL); // Signaling 서버 주소
  const remoteVideoRef = useRef<HTMLVideoElement>(null); // 상대방 영상보기
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const screenVideoRef = useRef<HTMLVideoElement>(null);
  const { isMyStreaming, setIsMyStreaming } = useBroadCastStore();
  const { nowStreamer } = useStreamerStore();


  const startScreenStreaming = async () => {
    try {
      // 화면 공유 스트림 가져오기
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false, // 화면 공유에 오디오가 필요하면 true로 변경
      });

      // 로컬 비디오 화면에 스트림 연결
      if (screenVideoRef.current) {
        screenVideoRef.current.srcObject = screenStream;
      }

      // WebRTC PeerConnection 생성
      peerConnection.current = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
      });

      // 화면 스트림의 모든 트랙을 PeerConnection에 추가
      screenStream.getTracks().forEach((track) => {
        peerConnection.current?.addTrack(track, screenStream);
      });

      // ICE Candidate 이벤트 처리
      peerConnection.current.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit('ice-candidate', event.candidate);
        }
      };

      // Remote Stream 처리
      peerConnection.current.ontrack = (event) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };

      // Offer 생성 및 signaling 서버로 전송
      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);
      socket.emit('offer', offer);
      return;
    } catch (error) {
      console.error('Error starting screen streaming:', error);
    }
    setIsMyStreaming(false); // 방송하기 눌렀는데, 공유버튼을 누르지 않으면 방송중이 아님.
  };

  const stopScreenStreaming = () => {
    try {
      // 1. PeerConnection 종료
      if (peerConnection.current) {
        peerConnection.current.close();
        peerConnection.current = null;
      }

      // 2. 로컬 화면 스트림 트랙 중지
      if (screenVideoRef.current?.srcObject) {
        const stream = screenVideoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
        screenVideoRef.current.srcObject = null; // 로컬 비디오 화면 초기화
      }

      // 3. Remote 비디오 화면 초기화
      // if (remoteVideoRef.current?.srcObject) {
      //   const remoteStream = remoteVideoRef.current.srcObject as MediaStream;
      //   remoteStream.getTracks().forEach((track) => track.stop());
      //   remoteVideoRef.current.srcObject = null;
      // }

      // 4. Signaling 서버에 방송 중지 알림
      socket.emit('stop-streaming'); // 서버에서 필요한 처리가 있다면 구현

    } catch (error) {
      console.error('Error stopping screen streaming:', error);
    }

  };


  // Signaling 메시지 수신 처리
  socket.on('answer', async (answer) => {
    await peerConnection.current?.setRemoteDescription(answer);
  });

  socket.on('ice-candidate', async (candidate) => {
    await peerConnection.current?.addIceCandidate(candidate);
  });


  useEffect(() => {
    // Signaling 서버로부터 메시지 수신 처리
    socket.on('answer', async (answer) => {
      await peerConnection.current?.setRemoteDescription(answer);
    });

    socket.on('ice-candidate', async (candidate) => {
      await peerConnection.current?.addIceCandidate(candidate);
    });

    if (isBroadcastMode) {
      if (isMyStreaming) {
        startScreenStreaming();
      } else {
        stopScreenStreaming();
      }
    }

    return () => {
      peerConnection.current?.close();
      socket.disconnect();
    };
  }, [isMyStreaming]);

  // 개인방송모드(*WEB RTC)
  if (isBroadcastMode && videoRef.current) {
    return <video ref={videoRef} autoPlay playsInline muted className="w-full h-auto rounded-md" />;
  }

  // TODO: 네이버 치지직은 현재 영상 API 제공하지 않음, 제공시 구현 필요 
  if (streamType === 'CHZZK') {
    return (
      <div className=' w-full h-full'>
        <span className="block text-center text-red-500">치지직은 현재 스트리밍 API가 없어서 영상을 제공할 수 없습니다.</span>
        <span className="block text-center text-red-300">(API 제공 시 구현 예정)</span>
      </div>
    )
  }

  if (streamType === 'TWITCH') {
    return (
      <div className='relative  w-full h-full'>

        {/* Twitch Video Embed */}
        <div>
          <iframe
            src={`https://player.twitch.tv/?channel=${nowStreamer?.name}&parent=${window.location.hostname}`}
            height="100%"
            width="100%"
            allowFullScreen={true}
            // className="rounded-lg"
            className="absolute top-0 left-0 w-full h-full"
          ></iframe>
        </div>
        {/* Twitch Chat Embed */}
        {/* <div className="w-full max-w-4xl mt-4">
            <iframe
              src={`https://www.twitch.tv/embed/${nowStreamer?.name}/chat?parent=localhost`}
              height="400"
              width="100%"
              frameBorder="0"
              className="rounded-lg"
            ></iframe>
          </div> */}
      </div>

    )
  }

  if (isBroadcastMode) {
    return (
      <div className="w-full h-full">
        <video
          ref={screenVideoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-contain bg-black "
        />
        {/* <video  // 상대방의 영상을 보는 영역
          ref={remoteVideoRef}
          autoPlay
          playsInline
          className="w-1/2 h-1/2 border border-gray-500 mt-4"
        /> */}
      </div>
    )
  }

  if (streamUrl) {
    return <ReactPlayer url={streamUrl} controls width="100%" height="auto" />;
  }

  return (
    <div className='row-start-3'>
      <span className="block text-center text-red-500">현재 구현중이거나 방송에 문제가 있습니다.</span>
    </div>
  )
};

export default StreamPlayer;