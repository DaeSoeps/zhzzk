'use client';
import React, { useState } from 'react';
import StreamerListChzzk from "./StreamerList/StreamerListChzzk";
// import StreamerListYoutube from "./StreamerList/StreamerListYoutube";
import StreamerListTwitch from "./StreamerList/StreamerListTwitch";
import useStreamerStore from '../store/useStreamerStore';


// TODO: 전역 타입으로 옮기기
enum StreamPlatforms {
  chzzk = '치지직',
  youtube = '유튜브',
  twitch = '트위치'
}

const Sidebar = () => {
  const [platforms] = useState([
    StreamPlatforms.chzzk,
    // StreamPlatforms.youtube,
     StreamPlatforms.twitch
  ]);
  const { nowPlatform, setNowPlatform } = useStreamerStore(); // 현재 플렛폼, 기본값은 치지직
  const handlePlatformsChange = (value: StreamPlatforms) => {
    setNowPlatform(value);
  }

  const docStreamerList = () => {
    if (nowPlatform === StreamPlatforms.chzzk) return <StreamerListChzzk />
    // if (nowPlatform === StreamPlatforms.youtube) return <StreamerListYoutube />
    if (nowPlatform === StreamPlatforms.twitch) return <StreamerListTwitch />
  }

  return (
    <aside className="w-80 bg-gray-800 text-white p-4 flex flex-col">
      <h1 className="text-xl font-bold mb-4 text-center border-b border-gray-700 pb-2">
        스트리머 목록
      </h1>
      <div className="flex justify-around bg-gray-800 py-2">
        {platforms.map((platform) => (
          <button
            key={platform}
            onClick={() => handlePlatformsChange(platform)}
            className={`text-white px-4 py-2 rounded-lg ${nowPlatform === platform ? 'bg-[#14532d]' : 'bg-gray-600 hover:bg-gray-500'
              }`}
          >
            {platform}
          </button>
        ))}
      </div>
      {docStreamerList()}

    </aside>
  );
};

export default Sidebar;