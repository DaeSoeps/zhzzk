import Link from "next/link";
import Image from "next/image";
import { Stream } from "@/types";

interface StreamCardProps {
  stream: Stream;
}

export default function StreamCard({ stream }: StreamCardProps) {
  return (
    <Link href={`/stream/${stream.id}`}>
      <div className="bg-[#2F2F2F] rounded-lg overflow-hidden transition-transform hover:scale-105">
        <div className="relative aspect-video">
          <Image
            src={stream.thumbnailUrl || `/api/placeholder/320/180`}
            alt={stream.title}
            fill
            className="object-cover"
          />
          {stream.isLive && (
            <span className="absolute bottom-2 right-2 bg-red-600 text-white text-sm px-2 py-1 rounded">
              LIVE
            </span>
          )}
          <span className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-sm px-2 py-1 rounded">
            시청자 {stream.viewers.toLocaleString()}명
          </span>
        </div>
        <div className="p-4">
          <h3 className="text-white font-medium mb-2 line-clamp-2">{stream.title}</h3>
          <p className="text-gray-400 text-sm">{stream.streamerName}</p>
          <p className="text-gray-400 text-sm">{stream.category}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {stream.tags.map((tag : any) => (
              <span key={tag} className="text-xs bg-[#3F3F3F] text-gray-300 px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}