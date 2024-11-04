// import React from 'react';
// import Navbar from './Navbar';
// import Sidebar from './Sidebar';

// interface LayoutProps {
//   children: React.ReactNode;
// }

// const Layout: React.FC<LayoutProps> = ({ children }) => {
//   return (
//     <div className="min-h-screen bg-[#1F1F1F]">
//       <Navbar />
//       <div className="flex">
//         <Sidebar />
//         <main className="flex-1">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Layout;
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CHZZK Clone",
  description: "네이버 게임 스트리밍 플랫폼 CHZZK 클론",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <div className="min-h-screen bg-[#1F1F1F]">
          <Navbar />
          <div className="flex">
            <Sidebar />
            <main className="flex-1">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}