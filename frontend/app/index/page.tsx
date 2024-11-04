import { GetServerSideProps } from 'next';
import { Stream } from '@/types';
import StreamCard from '@/components/StreamCard';

interface HomeProps {
  streams: Stream[];
}

export default function Home({ streams }: HomeProps) {
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

export const getServerSideProps: GetServerSideProps = async () => {
  // 실제로는 API 호출이 들어갈 자리입니다
  const streams: Stream[] = [
    {
      id: '1',
      title: '즐거운 게임 방송',
      streamerName: '스트리머1',
      viewers: 15000,
      thumbnailUrl: '/placeholder.jpg',
      category: '리그 오브 레전드',
      tags: ['게임', 'LOL'],
      isLive: true,
    },
    // 더 많은 스트림 데이터...
  ];

  return {
    props: {
      streams,
    },
  };
};