// import Image from "next/image";
// import styles from "./page.module.css";
// import Link from "next/link";
// import "tailwindcss/tailwind.css";

// import React from 'react';
// // import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Sidebar from './components/Sidebar';
// import MainContent from './components/MainContent';
// import { StreamProvider } from './context/StreamContext';

// import '../app/globals.css'; 

// {/* <Link href="/login">login</Link>
// <Link href="/main">main</Link> */}
// // 타입 정의
// import type { AppProps } from 'next/app';
// // import '@/styles/globals.css';
// import Layout from './components/Layout';

// export default function Home() {
//   return (
//     <Layout>
//       <Link href="/login">login</Link>
//       <Link href="/main">main</Link>
//     </Layout >
//   );
// }


import { Stream } from "@/types";
import StreamCard from "./components/StreamCard";

async function getStreams(): Promise<Stream[]> {
  // 실제로는 API 호출이 들어갈 자리입니다
  return [
    {
      id: "1",
      title: "즐거운 게임 방송",
      streamerName: "스트리머1",
      viewers: 15000,
      thumbnailUrl: "/placeholder.jpg",
      category: "리그 오브 레전드",
      tags: ["게임", "LOL"],
      isLive: true,
    },
    // 더 많은 스트림 데이터...
  ];
}

export default async function Home() {
  const streams = await getStreams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-6">인기 스트리밍</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {streams.map((stream) => (
          <StreamCard key={stream.id} stream={stream} />
        ))}
      </div>
    </div>
  );
}
