import React from 'react';
import ChatRoomBroadCast from '../components/ChatRoomBroadCast';
import StreamPlayer from '../components/StreamPlayer';
import Layout from '../components/Layout';

const BroadcastPage: React.FC = () => {
    return (

        <Layout>
            <div className="flex w-full h-full">
                {/* 가운데 메인 콘텐츠: 플레이어 */}
                <div className="flex flex-1 justify-center items-center w-full h-full">
                    <StreamPlayer isBroadcastMode />
                </div>

                {/* 오른쪽 채팅 영역 */}
                <div className="w-[300px] bg-gray-800 p-4 h-full overflow-y-auto">
                    <ChatRoomBroadCast isBroadcastMode />
                </div>
            </div>
        </Layout>

    );
};

export default BroadcastPage;