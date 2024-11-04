import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div className="w-60 bg-[#1A1A1A] p-4 text-white">
      <h2 className="font-bold mb-4">추천 스트리머</h2>
      <div className="space-y-4">
        {/* 추천 스트리머 목록 */}
        {Array.from({length: 5}).map((_, i) => (
          <div key={i} className="flex items-center space-x-2">
            <img
              src={`/api/placeholder/32/32`}
              alt="Streamer"
              className="w-8 h-8 rounded-full"
            />
            <div>
              <p className="text-sm">스트리머 {i + 1}</p>
              <p className="text-xs text-gray-400">게임 카테고리</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};