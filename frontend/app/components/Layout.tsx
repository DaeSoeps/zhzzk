import '../globals.css';
import Sidebar from '../components/Sidebar';
import ChatRoom from '../components/ChatRoom';
import Navbar from '../components/Navbar';
import Footer from './Footer';


// flex h-[calc(100vh-56px)]  flex flex-1
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white flex flex-col min-h-screen">
        {/* 상단 네비게이션 바 */}
        <Navbar />
        
        <div className="flex h-[calc(100vh-116px)]">
          {/* 왼쪽 사이드바 */}
          <Sidebar />

          {/* 가운데 메인 콘텐츠 */}
          <main className="flex-1 flex justify-center items-center shadow-lg">
            {children}
          </main>
          {/* <ChatRoom /> */}
          {/* 하단 푸터 */}
          
        </div>
        <Footer />
      </body>
    </html>
  );
}

