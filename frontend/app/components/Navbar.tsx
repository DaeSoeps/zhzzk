"use client";

import { Search, Bell, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <nav className="bg-[#1A1A1A] h-14 flex items-center px-4 justify-between sticky top-0 z-50">
      <div className="flex items-center space-x-8">
        <Link href="/" className="flex items-center">
          <img src="/api/placeholder/100/32" alt="CHZZK" className="h-8" />
        </Link>
        <div className="space-x-4">
          <Link href="/" className="text-white hover:text-green-400">
            홈
          </Link>
          <Link href="/categories" className="text-white hover:text-green-400">
            카테고리
          </Link>
          <Link href="/following" className="text-white hover:text-green-400">
            팔로잉
          </Link>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="스트리머, 카테고리 검색"
            className="bg-[#2F2F2F] text-white px-4 py-2 rounded-full w-64 focus:outline-none"
          />
          <Search className="absolute right-3 top-2.5 text-gray-400 cursor-pointer" size={20} />
        </div>
        <Bell className="text-white cursor-pointer" size={24} />
        <User className="text-white cursor-pointer" size={24} />
      </div>
    </nav>
  );
}