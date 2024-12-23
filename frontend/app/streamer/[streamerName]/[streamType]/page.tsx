'use client';
import React from 'react';
import ChatRoom from '../../../components/ChatRoom';
import StreamPlayer from '../../../components/StreamPlayer';
import Layout from '../../../components/Layout';
import LiveInfomation from '@/app/components/LiveInfomation';



export default async function StreamerPage({ params, }: {
    params: Promise<{ streamerName: string; streamType: string }>
}) {
    return (
        <Layout>
            {/* 가운데 메인 콘텐츠: 플레이어 */}
            <div className="flex flex-col justify-between items-center h-full w-full">
                <StreamPlayer streamUrl={""} streamType={(await params).streamType} />
                <LiveInfomation streamerName={decodeURIComponent((await params).streamerName)} />
            </div>
 
            {/* 오른쪽 채팅 영역 */}
            <div className="w-[400px] bg-gray-800 p-4 h-full overflow-y-auto right-0">
                <ChatRoom streamerName={decodeURIComponent((await params).streamerName)} />
            </div>

        </Layout>
    )
}
