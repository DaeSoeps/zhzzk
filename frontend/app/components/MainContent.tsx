import React from 'react';
import StreamCard from './StreamCard';
import { useStreamContext } from '../context/StreamContext';

const MainContent: React.FC = () => {
  const { streams } = useStreamContext();

  return (
    <div className="flex-1 p-6 bg-[#1F1F1F]">
      <h1 className="text-2xl font-bold text-white mb-6">인기 스트리밍</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {streams.map((stream) => (
          <StreamCard key={stream.id} stream={stream} />
        ))}
      </div>
    </div>
  );
};