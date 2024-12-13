'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import ChatRoom from '../../../components/ChatRoom';
import StreamPlayer from '../../../components/StreamPlayer';
import Layout from '../../../components/Layout';
import LiveInfomation from '@/app/components/LiveInfomation';
// import { GetStaticPaths } from 'next';


// export const getStaticPaths = (async () => {
//     return {
//       paths: [
//       ],
//       fallback: "blocking", // false or "blocking"
//     }
//   }) satisfies GetStaticPaths


const StreamerPage: React.FC = () => {
    const params = useParams<{ streamerName: string; streamType: string }>();
    console.log("PROPS : ", params)
    const streamerName = decodeURIComponent(params.streamerName);
    // const streamUrl = `https://example.com/hls/${streamerName}.m3u8`; // HLS URL


    return (
        <Layout>
            {/* 가운데 메인 콘텐츠: 플레이어 */}
            <div className="flex flex-col justify-between items-center h-full w-full">
                <StreamPlayer streamUrl={""} streamType={params.streamType} />
                <LiveInfomation streamerName={streamerName} />
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