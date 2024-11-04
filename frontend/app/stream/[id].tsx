import { GetServerSideProps } from 'next';
import { Stream } from '@/types';
import { useRouter } from 'next/router';

interface StreamPageProps {
  stream: Stream;
}

export default function StreamPage({ stream }: StreamPageProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="aspect-video bg-black mb-4">
        {/* 실제 스트림 플레이어가 들어갈 자리 */}
        <div className="w-full h-full flex items-center justify-center text-white">
          Stream Player
        </div>
      </div>
      <h1 className="text-2xl font-bold text-white mb-4">{stream.title}</h1>
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={`/api/placeholder/48/48`}
          alt={stream.streamerName}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <p className="text-white font-medium">{stream.streamerName}</p>
          <p className="text-gray-400 text-sm">{stream.category}</p>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // 실제로는 API 호출이 들어갈 자리입니다
  const stream: Stream = {
    id: params?.id as string,
    title: '즐거운 게임 방송',
    streamerName: '스트리머1',
    viewers: 15000,
    thumbnailUrl: '/placeholder.jpg',
    category: '리그 오브 레전드',
    tags: ['게임', 'LOL'],
    isLive: true,
  };

  return {
    props: {
      stream,
    },
  };
};