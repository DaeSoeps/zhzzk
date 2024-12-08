"use client";

import Image, { StaticImageData } from "next/image";
// import { Search, Bell, User } from "lucide-react";
import React, { useEffect } from "react";
import useStreamerStore from "../store/useStreamerStore";


type Streamer = {
    id: string;
    name: string;
    icon: StaticImageData;
    viewers: number;
    game: string;
    streamType: string;
};


const LiveInfomation: React.FC = () => {
    const {nowStreamer} = useStreamerStore();
    
    // useEffect(() => {
    //     console.log(" LIVE StreamerInfo : ", StreamerInfo)
    // }, [StreamerInfo]);
    if(!nowStreamer) return <></>
    return (
        
        <div className="row-start-5  bg-gray-800   w-full h-full ">
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
