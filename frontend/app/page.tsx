import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import "tailwindcss/tailwind.css";

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import { StreamProvider } from './context/StreamContext';


{/* <Link href="/login">login</Link>
<Link href="/main">main</Link> */}
// 타입 정의
export interface Stream {
  id: string;
  title: string;
  streamerName: string;
  viewers: number;
  thumbnailUrl: string;
  category: string;
}

const App: React.FC = () => {
  return (
    <StreamProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-[#1F1F1F]">
          <Navbar />
          <div className="flex flex-1">
            <Sidebar />
            <Routes>
              <Route path="/" element={<MainContent />} />
            </Routes>
          </div>
        </div>
      </Router>
    </StreamProvider>
  );
};

export default App; // Home?
