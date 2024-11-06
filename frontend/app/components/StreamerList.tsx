"use client"
import { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

const StreamerList = () => {
  const [streamers] = useState([
    { id: 1, name: '스트리머1' },
    { id: 2, name: '스트리머2' },
    { id: 3, name: '스트리머3' },
  ]);

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">스트리머 목록</h3>
      <ul>
        {streamers.map((streamer) => (
          <li key={streamer.id} className="flex items-center py-2 border-b border-gray-600">
            <FaUserCircle className="text-2xl mr-3" />
            <span>{streamer.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StreamerList;