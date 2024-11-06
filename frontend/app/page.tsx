"use client";
import StreamPlayer from './components/StreamPlayer';
import Layout from './components/Layout'
export default function HomePage() {
  return (
    <Layout>
      <div className="flex justify-center items-center w-full h-full">
        <StreamPlayer />
      </div>
    </Layout>
  );
}