"use client";
import { useEffect, useState } from 'react';
import { dummyStreamerInfo as util } from '../../utils/util'
import { useRouter } from 'next/navigation';
import Image, { StaticImageData } from 'next/image';
import useStreamerStore from '../../store/useStreamerStore';
import { useBroadCastStore } from '../../store/useBroadCastStore';
import api from '@/app/utils/api';

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const {
    streamers,
    setStreamer,
  } = useStreamerStore();
  const { setIsMyStreaming } = useBroadCastStore();

  const getTwitchStreamerInfo = async () => {
    const utils = new util();
    const uniqueImages = utils.getUniqueImages(7); // 중복 없는 이미지 배열 가져오기
    try {

      const sts: Streamer[] = [];
      // const stName = ["Zizaran","Quin69","wudijo"];
      // 트위치에서는 배열로 스트리머 정보를 받을 수 있는데, 서버에서 처리해야함.
      const getAPI = await api.get(`/twitch/streamer`);
      
      if (getAPI.status === 200) {
        const data = getAPI.data;
        data.map((v : any, i : number)=>{
          sts.push(
            {
              id: v.game_id,
              name: v.user_name,
              icon: uniqueImages[i],
              viewers: v.viewer_count,
              game: v.game_name,
              streamType: "TWITCH"
            }
          )
        })
      }

      console.log("TWITCH : ", getAPI)
      console.log("sts : ", sts)

      setStreamer(sts)
      setLoading(false);

    } catch (error: any) {
      if (error.response) {
        // 서버에서 반환한 에러 메시지 처리
        alert(error.response.data.message || '트위치 정보 가져오기 실패했습니다.');
      } else {
        // 네트워크 에러 또는 기타 에러 처리
        alert('서버와 통신에 실패했습니다.');
        setError("서버와 통신에 실패했습니다.")
      }
    }
  }

  useEffect(() => {
    // fetchStreamer();
    setStreamer([])
    getTwitchStreamerInfo();

  }, []);


  const handleStreamerClick = (streamer: Streamer) => {
    // 스트리머 파라미터 여부에 따라서 스트리머 방송보기 / 내 방송하기 로직 구분
    if (streamer.streamType === 'broadcast') return router.push(`/broadcast`); // 방송중인 사람이면 브로드캐스트로 이동
    streamer && setNowStreamer(streamer);
    if (streamer) {
      if (nowStreamer) {
        if (nowStreamer.name === streamer.name) return; // 현재스트리머일때 로직타지않기
      }
      setIsMyStreaming(false); // 내가방송하기 해체

      router.push(`/streamer/${streamer.name}/${streamer.streamType}`);
    }

  };

  //TODO : 로딩, 에러처리 필요
  if (loading === true) return <div>로딩중입니다. 잠시만 기다려주세요.</div>
  if (error) return <div>{error}</div>

  return (
    <div className="flex flex-col space-y-3">
      {streamers.map((streamer, i) => (
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