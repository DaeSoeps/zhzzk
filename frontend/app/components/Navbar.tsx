"use client";

// import { Search, Bell, User } from "lucide-react";
import { useState } from 'react';
import { FiSearch, FiLogOut, FiUser, FiChevronDown } from 'react-icons/fi';
import { BsFillPersonFill } from 'react-icons/bs';
import Link from 'next/link'
import { useBroadCastStore } from '../store/useBroadCastStore';
import { useRouter } from 'next/navigation';

const Navbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isMyStreaming, setIsMyStreaming } = useBroadCastStore();
  const router = useRouter();

  const handleToggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    // 로그아웃 로직 추가
    console.log('Logout clicked');
  };

  const handleIsMyStreaming = () => {
    if(isMyStreaming === true){
      setIsMyStreaming(false) 
    }else{
      setIsMyStreaming(true);
      router.push(`/broadcast`);

    }
  };

  return (
    <div className="w-full h-14 bg-gray-900 flex items-center justify-between px-4 shadow-lg">
      {/* 좌측 로고 */}
      <h1 className="text-xl font-bold text-white">지지직</h1>

      {/* 검색창 */}
      <div className="w-1/6 relative flex items-center space-x-2">
        <input
          type="text"
          placeholder="스트리머, 게임 영상 검색"
          className="w-full bg-gray-700 text-white p-2 rounded-lg outline-none placeholder-gray-400"
        />
        <FiSearch className="absolute right-3 top-2.5 text-gray-400 cursor-pointer" size={20} />
      </div>

      {/* 내 방송하기 버튼 */}
      <button
        onClick={handleIsMyStreaming}
        className={`px-4 py-2 text-sm font-medium rounded-lg ${isMyStreaming ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
          } text-white`}
      >
        {isMyStreaming ? '방송 중지' : '내 방송하기'}
      </button>

      {/* 우측 프로필 드롭다운 */}
      <div className="relative">
        <div
          onClick={handleToggleDropdown}
          className="flex items-center cursor-pointer space-x-2"
        >
          <BsFillPersonFill className="text-white text-2xl" />
          <FiChevronDown className="text-white" />
        </div>

        {/* 드롭다운 메뉴 */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-lg shadow-lg z-10">
            <ul className="py-2 text-white">
              <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer flex items-center">
                <FiUser className="mr-2" /> 내 채널
              </li>
              <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer flex items-center">
                <FiUser className="mr-2" /> 내 구독
              </li>
              <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer flex items-center">
                <FiUser className="mr-2" /> 내 채팅
              </li>
              <hr className="border-gray-600 my-1" />
              <Link href="/login">
                <li
                  onClick={handleLogout}
                  className="px-4 py-2 hover:bg-gray-600 cursor-pointer flex items-center text-red-400"
                >
                  <FiLogOut className="mr-2" /> 로그아웃
                </li>
              </Link>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
