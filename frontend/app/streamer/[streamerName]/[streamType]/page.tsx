'use client';
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import ChatRoom from '../../../components/ChatRoom';
import StreamPlayer from '../../../components/StreamPlayer';
import Layout from '../../../components/Layout';
import LiveInfomation from '@/app/components/LiveInfomation';
import useStreamerStore from '@/app/store/useStreamerStore';


const StreamerPage: React.FC = () => {
    const params = useParams<{ streamerName: string; streamType: string }>();
    console.log("PROPS : ", params)
    const streamerName = decodeURIComponent(params.streamerName);
    // const streamUrl = `https://example.com/hls/${streamerName}.m3u8`; // HLS URL
    const { nowStreamer, streamers, setNowStreamer } = useStreamerStore();

    useEffect(() => {
        // 현재스트리머 설정하기
        if (streamers.length > 0) {
            streamers.filter((v) => v.name === streamerName ? setNowStreamer(v) : null);

        }
    }, [streamers]);

    return (
        <Layout>
            {/* 가운데 메인 콘텐츠: 플레이어 */}
            <div className="grid grid-rows-5 justify-stretch justify-center items-center h-full w-full">
                <StreamPlayer streamUrl={""} streamType={params.streamType} />
                <LiveInfomation />
            </div>

            {/* 오른쪽 채팅 영역 */}
            <div className="w-[400px] bg-gray-800 p-4 h-full overflow-y-auto right-0">
                <ChatRoom streamerName={streamerName} />
            </div>

        </Layout>
    );
};

// export const getServerSideProps: GetServerSideProps  = async ({ params }) => {
//     const id = params;
//     console.log("PROPS !: ", params)
//     // 필요한 데이터를 가져와 props로 전달
//     return {
//         props: {
//             id,
//         },
//     };
// };


export default StreamerPage;