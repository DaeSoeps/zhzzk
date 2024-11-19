'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import ChatRoom from '../../../components/ChatRoom';
import StreamPlayer from '../../../components/StreamPlayer';
import Layout from '../../../components/Layout';


const StreamerPage: React.FC = () => {
    const params = useParams<{ streamerName: string; streamType: string }>();
    console.log("PROPS : ", params )
    const streamerName = decodeURIComponent(params.streamerName);
    // const streamUrl = `https://example.com/hls/${streamerName}.m3u8`; // HLS URL

    return (
        <Layout>
            {/* 가운데 메인 콘텐츠: 플레이어 */}
            <div className="flex flex-1 justify-center items-center">
                <StreamPlayer streamUrl={""} streamType={params.streamType}/>
            </div>

            {/* 오른쪽 채팅 영역 */}
            <div className="w-[300px] bg-gray-800 p-4 h-full overflow-y-auto">
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