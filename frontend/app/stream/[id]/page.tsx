import { Stream } from "@/types";
import Image from "next/image";

async function getStream(id: string): Promise<Stream> {
  return {
    id,
    title: "즐거운 게임 방송",
    streamerName: "스트리머1",
    viewers: 15000,
    thumbnailUrl: "/placeholder.jpg",
    category: "리그 오브 레전드",
    tags: ["게임", "LOL"],
    isLive: true,
  };
}

export default async function StreamPage({
  params,
}: {
  params: { id: string };
}) {
  const stream = await getStream(params.id);

  return (
    <div className="p-6">
      <div className="aspect-video bg-black mb-4">
        <div className="w-full h-full flex items-center justify-center text-white">
          Stream Player
        </div>
      </div>
      <h1 className="text-2xl font-bold text-white mb-4">{stream.title}</h1>
      <div className="flex items-center space-x-4 mb-6">
        <Image
          src={`/api/placeholder/48/48`}
          alt={stream.streamerName}
          width={48}
          height={48}
          className="rounded-full"
        />
        <div>
          <p className="text-white font-medium">{stream.streamerName}</p>
          <p className="text-gray-400 text-sm">{stream.category}</p>
        </div>
      </div>
    </div>
  );
}