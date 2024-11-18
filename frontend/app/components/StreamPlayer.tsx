'use client';
import React, { useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';

interface StreamPlayerProps {
  isBroadcastMode?: boolean; // 내가 방송하기 모드 여부
  streamUrl?: string; // HLS URL (스트리머 방송 보기 모드에서 사용)
  streamType?: string;// 스트림 플렛폼 종류(치지직, 유튜브 등)
}

const StreamPlayer: React.FC<StreamPlayerProps> = ({ isBroadcastMode, streamUrl, streamType }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (isBroadcastMode && videoRef.current) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          videoRef.current!.srcObject = stream;
        })
        .catch((err) => console.error('Error accessing media devices:', err));
    }
  }, [isBroadcastMode]);

  if (isBroadcastMode && videoRef.current) {
    return <video ref={videoRef} autoPlay playsInline muted className="w-full h-auto rounded-md" />;
  }

  // TODO: 네이버 치지직은 현재 영상 API 제공하지 않음, 제공시 구현 필요 
  if (streamType === 'CHZZK') {
    return (
      <div>
        <span className="block text-center text-red-500">치지직은 현재 스트리밍 API가 없어서 영상을 제공할 수 없습니다.</span>
        <span className="block text-center text-red-300">(API 제공 시 구현 예정)</span>
      </div>
    )
  }

  if (streamUrl) {
    return <ReactPlayer url={streamUrl} controls width="100%" height="auto" />;
  }

  return <p className="text-gray-500">스트림을 로드 중입니다...</p>;
};

export default StreamPlayer;