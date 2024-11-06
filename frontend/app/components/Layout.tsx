import '../globals.css';
import Sidebar from '../components/Sidebar';
import ChatRoom from '../components/ChatRoom';
import Navbar from '../components/Navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white">
        {/* 상단 네비게이션 바 */}
        <Navbar />

        <div className="flex h-[calc(100vh-56px)]">
          {/* 왼쪽 사이드바 */}
          <Sidebar />

          {/* 가운데 메인 콘텐츠 */}
          <main className="flex-1 flex justify-center items-center">
            {children}
          </main>

          {/* 오른쪽 채팅창 */}
          <ChatRoom />
        </div>
      </body>
    </html>
  );
}

