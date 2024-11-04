import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-60 bg-[#1A1A1A] p-4 text-white hidden md:block min-h-screen">
      <div className="mb-6">
        <h2 className="font-bold mb-4">추천 스트리머</h2>
        <div className="space-y-4">
          {Array.from({length: 5}).map((_, i) => (
            <Link href={`/streamer/${i + 1}`} key={i}>
              <div className="flex items-center space-x-2 hover:bg-[#2F2F2F] p-2 rounded">
                <img
                  src={`/api/placeholder/32/32`}
                  alt="Streamer"
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className="text-sm">스트리머 {i + 1}</p>
                  <p className="text-xs text-gray-400">게임 카테고리</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      <div>
        <h2 className="font-bold mb-4">인기 카테고리</h2>
        <div className="space-y-2">
          {["리그 오브 레전드", "배틀그라운드", "롤토체스", "발로란트"].map((category) => (
            <Link 
              href={`/category/${category}`} 
              key={category}
              className="block hover:bg-[#2F2F2F] p-2 rounded text-sm"
            >
              {category}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}