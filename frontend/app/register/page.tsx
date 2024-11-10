'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // API 호출 로직 (생략)
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-center text-2xl font-bold text-green-600 mb-6">ZHZZK</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">아이디</label>
            <div className="relative mt-1">
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-green-500 text-black"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="아이디"
                required
              />
              {/* <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">@naver.com</span> */}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">비밀번호</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-green-500 text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">이메일</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-green-500 text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일 주소"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">이름</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-green-500 text-black"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름"
              required
            />
          </div>
          
          {/* <div>
            <label className="block text-sm font-medium text-gray-700">휴대전화번호</label>
            <div className="flex space-x-2 mt-1">
              <select className="w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-green-500 text-black">
                <option>대한민국 +82</option>
                <option>미국 +1</option>
                <option>일본 +81</option>
              </select>
              <input
                type="tel"
                className="w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-green-500"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="휴대전화번호"
                required
              />
            </div>
          </div> */}

          <button
            type="submit"
            className="w-full py-2 mt-6 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700"
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;