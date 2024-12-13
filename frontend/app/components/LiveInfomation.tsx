"use client";

import Image from "next/image";
// import { Search, Bell, User } from "lucide-react";
import React, { useEffect } from "react";
import useStreamerStore from "../store/useStreamerStore";

interface LiveInfomationProps {
    streamerName?: string; // 스트리머 이름 (방송 보기 모드에서 사용)
}

const LiveInfomation: React.FC<LiveInfomationProps> = ({ streamerName }) => {
    const { nowStreamer, streamers, setNowStreamer } = useStreamerStore();

    useEffect(() => {
        // 현재스트리머 설정하기
        if (streamers.length > 0) {
            streamers.filter((v) => v.name === streamerName ? setNowStreamer(v) : null);

        }
    }, [streamers]);

    if (!nowStreamer) return <></>
    return (

        <div className="w-full h-64 bg-gray-800">
            {/* 스트리머 아이콘 */}
            <Image
                className="w-16 h-16 rounded-full mr-4"
                src={nowStreamer.icon}
                alt={`${nowStreamer.name} icon`}
            />

            {/* 스트리머 정보 */}
            <div>
                {/* 방송 제목 */}
                <div className="text-white font-bold text-sm">{nowStreamer.game}</div>

                {/* 스트리머 메타 정보 */}
                <div className="text-gray-400 text-xs mt-1">
                    <span className="text-white font-bold mr-2">{nowStreamer.name}</span>
                    <span className="text-red-500 font-bold mr-2">LIVE</span>
                    <span className="mr-2">{nowStreamer.viewers?.toLocaleString()}명 시청 중</span>
                    {/* <span>{time}</span> */}
                </div>
            </div>
        </div>

    );
};

export default LiveInfomation;
