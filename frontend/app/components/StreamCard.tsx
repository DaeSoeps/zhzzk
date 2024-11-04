import React from 'react';
import { Stream } from '../App';

interface StreamCardProps {
  stream: Stream;
}

const StreamCard: React.FC<StreamCardProps> = ({ stream }) => {
  return (
    <div className="bg-[#2F2F2F] rounded-lg overflow-hidden">
      <div className="relative">
        <img
          src={`/api/placeholder/320/180`}
          alt={stream.title}
          className="w-full object-cover"
        />
        <span className="absolute bottom-2 right-2 bg-red-600 text-white text-sm px-2 py-1 rounded">
          LIVE
        </span>
        <span className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-sm px-2 py-1 rounded">
          시청자 {stream.viewers.toLocaleString()}명
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-white font-medium mb-2">{stream.title}</h3>
        <p className="text-gray-400 text-sm">{stream.streamerName}</p>
        <p className="text-gray-400 text-sm">{stream.category}</p>
      </div>
    </div>
  );
};