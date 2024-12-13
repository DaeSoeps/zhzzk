'use client';
import React, { ReactNode, useState } from 'react';
import StreamerListChzzk from "./StreamerList/StreamerListChzzk";
import StreamerListYoutube from "./StreamerList/StreamerListYoutube";
import StreamerListTwitch from "./StreamerList/StreamerListTwitch";


const Sidebar = () => {
  const [platforms] = useState(['치지직', '유튜브', '트위치']);
  const [currentPlatform, setCurrentPlatform] = useState('치지직'); // 기본 스트리머 목록은 치지직

  const handlePlatformsChange = (value: string) => {
    setCurrentPlatform(value);
  }

  const docStreamerList = () => {
    if (currentPlatform === '치지직') return <StreamerListChzzk />
    if (currentPlatform === '유튜브') return <StreamerListYoutube />
    if (currentPlatform === '트위치') return <StreamerListTwitch />
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
            className={`text-white px-4 py-2 rounded-lg ${currentPlatform === platform ? 'bg-[#14532d]' : 'bg-gray-600 hover:bg-gray-500'
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