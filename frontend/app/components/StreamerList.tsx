"use client"
import { useEffect, useState } from 'react';
import { dummyStreamerInfo as util } from '../utils/util'
import { io, Socket } from '../utils/socket';
import { useRouter } from 'next/navigation';
import Image, { StaticImageData } from 'next/image';
import useStreamerStore from '../store/useStreamerStore';


interface ChatMessage {
  message: string;
  nickname: string;
}

interface Streamer {
  id: string;
  name: string;
  icon: StaticImageData;
  viewers: number;
  game: string;
  streamType: string;
}

const StreamerList: React.FC = () => {
    // const [streamers, setStreamers] = useState<Streamer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const router = useRouter();
  const { streamers, setStreamer, addStreamer, updateStreamer } = useStreamerStore();


  // 스트리머 Dummy 데이터 생성 함수
  const generateStreamers = (count: number): Streamer[] => {
    const utils = new util();
    const uniqueImages = utils.getUniqueImages(count); // 중복 없는 이미지 배열 가져오기
    const uniqueStreamers = utils.getUniqueName(count);
    return Array.from({ length: count }, (_, index) => ({
      id: index.toString(),
      name: uniqueStreamers[index], // 중복 없이
      icon: uniqueImages[index], // 중복 없이
      viewers: utils.getRandomNumber(100, 10000), // 100 ~ 10,000 랜덤 시청자 수
      game: utils.getRandomGame(),
      streamType: utils.getRandomStreamType(),
    }));
  };

  // API 호출 함수
  const fetchStreamers = async () => {
    setLoading(true);
    setError(null);

    // TODO : 추후에 치지직에서 스트리머 목록조회 API제공하면 기능구현.
    try {
      // const response = await api.get('https://api.chzzk.example.com/streamers'); // 실제 API 경로로 변경
      // setStreamers(response.data); // API 데이터에 맞게 파싱 필요

      const streamerInfoAry = generateStreamers(8);
      setStreamer(streamerInfoAry)
    } catch (error) {
      setError(`스트리머 정보를 불러오는 데 실패했습니다. ${error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(streamers.length === 0){
      fetchStreamers();
    }

  }, []);


  const handleStreamerClick = (streamer?: Streamer) => {

    if (streamer) {

      console.log("streamerName", streamer)
      if (socket) {
        socket.disconnect();
      }

      // 새 소켓 연결 생성
      const newSocket = io(process.env.NEXT_PUBLIC_BACK_URL); // WebSocket 서버 URL
      setSocket(newSocket);

      // 서버와 연결 성공 시 실행
      newSocket.on('connect', () => {
        console.log('Connected to Chzzk WebSocket');

        // 서버로 스트리머 이름 전송
        newSocket.emit('requestChatData', { streamerName: streamer.name });
      });

      // 서버로부터 실시간 데이터 수신
      newSocket.on('receiveChatData', (data: { chatData: ChatMessage }) => {
        // const { chatData } = data;
        // console.log('Received chat data:', chatData.message, chatData.nickname);
        if (data) {
          // setChatData((prev) => [...prev, ...data.chatData]); // 기존 메시지에 새 메시지 추가
        }
      });

      // 서버 연결 종료 이벤트 처리
      newSocket.on('disconnect', () => {
        console.log('Disconnected from WebSocket');

      });
      router.push(`/streamer/${streamer.name}/${streamer.streamType}`);
    }


  };

  //TODO : 로딩, 에러처리 필요
  if(loading === true) return <div>Loading...</div>
  if(error) return <div>error!</div>

  return (
    <div className="flex flex-col space-y-3">
      {streamers.map((streamer, i) => (
        <div
          key={streamer.id + i}
          className="flex items-center bg-gray-800 hover:bg-gray-700 p-3 rounded-md shadow-md transition-all"
          onClick={() => handleStreamerClick(streamer)}
        >
          <Image
            src={streamer.icon}
            alt={streamer.name}
            className="w-12 h-12 rounded-full border border-gray-600"
          />
          <div className="ml-4">
            <h2 className="text-sm font-bold">{streamer.name}</h2>
            <p className="text-xs text-gray-400">{streamer.game}</p>
            <p className="text-xs text-green-400">
              시청자 수: {streamer.viewers}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StreamerList;