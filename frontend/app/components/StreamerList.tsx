"use client"
import { useEffect, useState } from 'react';
import { dummyStreamerInfo as util } from '../utils/util'
import { useRouter } from 'next/navigation';
import Image, { StaticImageData } from 'next/image';
import useStreamerStore from '../store/useStreamerStore';
import { useBroadCastStore } from '../store/useBroadCastStore';
import { addStreamer, getStreamers } from '../firebase/firebaseActions';

interface Streamer {
  id: string;
  name: string;
  icon: StaticImageData;
  viewers: number;
  game: string;
  streamType: string;
}

const StreamerList: React.FC = () => {
  const { nowStreamer, setNowStreamer } = useStreamerStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const {
    streamers,
    setStreamer,
  } = useStreamerStore();
  const { setIsMyStreaming } = useBroadCastStore();

  // 스트리머 Dummy 데이터 생성 함수
  const generateStreamers = (count: number): Streamer[] => {
    const utils = new util();
    const uniqueImages = utils.getUniqueImages(count); // 중복 없는 이미지 배열 가져오기
    const uniqueStreamers = utils.getUniqueName(count);
    return Array.from({ length: count }, (_, index) => ({
      id: index.toString(),
      name: uniqueStreamers[index],
      icon: uniqueImages[index], // 중복 없이
      viewers: utils.getRandomNumber(100, 10000), // 100 ~ 10,000 랜덤 시청자 수
      game: utils.getRandomGame(),
      streamType: utils.getRandomStreamType(),
    }));
  };

  // API 호출 함수
  const fetchStreamer = async () => {
    setLoading(true);
    setError(null);

    // TODO : 추후에 치지직에서 스트리머 목록조회 API제공하면 기능구현.
    try {
      const fetchStreamers = async () => {
        // Firebase에서 스트리머 목록 가져오기
        const data = await getStreamers();
        if (data.length === 0 && streamers.length === 0) {
          // 데이터가 없으면 기본 스트리머 추가
          addStreamer(generateStreamers(7)) //fb 스토리지에 저장
          setStreamer(generateStreamers(7));
        } else {
          // 데이터가 있으면 상태에 저장
          setStreamer(data);
        }
      };

      fetchStreamers();
    } catch (error) {
      setError(`스트리머 정보를 불러오는 데 실패했습니다. ${error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStreamer();

  },[]);

  useEffect(() => {
    console.log("nowStreamer : ", nowStreamer)
  },[streamers]);


  const handleStreamerClick = (streamer: Streamer) => {
    // 스트리머 파라미터 여부에 따라서 스트리머 방송보기 / 내 방송하기 로직 구분
    if (streamer.streamType === 'broadcast') return router.push(`/broadcast`); // 방송중인 사람이면 브로드캐스트로 이동
    streamer && setNowStreamer(streamer);
    if (streamer) {
      if(nowStreamer){
        if (nowStreamer.name === streamer.name) return; // 현재스트리머일때 로직타지않기
      }
      setIsMyStreaming(false); // 내가방송하기 해체

      router.push(`/streamer/${streamer.name}/${streamer.streamType}`);
    }

  };

  //TODO : 로딩, 에러처리 필요
  if (loading === true) return <div>Loading...</div>
  if (error) return <div>error!</div>

  return (
    <div className="flex flex-col space-y-3">
      {streamers.length > 0 &&  streamers.map((streamer, i) => (
        <div
          key={streamer.id + i}
          className={`flex items-center ${nowStreamer?.name === streamer.name ? 'bg-[#14532d]' : 'bg-gray-800'} hover:bg-gray-700 p-3 rounded-md shadow-md transition-all cursor-pointer`}
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
    </div >
  );
};

export default StreamerList;