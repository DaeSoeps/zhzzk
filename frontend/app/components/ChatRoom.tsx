"use client"
import { useState, useEffect, useRef } from 'react';
import { io, Socket } from '../utils/socket';
import { helper as util } from '../utils/util'
import { faker } from "@faker-js/faker";

type Message = {
    nickname: string;
    message: string;
};

interface ChatMessage {
    message: string;
    nickname: string;
}

export interface IMsg {
    nickname: string;
    message: string;
}

interface ChatRoomProps {
    streamerName?: string; // 스트리머 이름 (방송 보기 모드에서 사용)
}

const ChatRoom: React.FC<ChatRoomProps> = ({ streamerName }) => {
    const MAX_MESSAGES = 100; // 최대 메시지 수
    const [nickname] = useState<string>(() => faker.person.firstName() + faker.person.lastName());
    const [messages, setMessages] = useState<Array<Message>>([]); // 매세지들 (채티창에 쌓인 글들)
    const [newMessage, setNewMessage] = useState('');  // 메시지 (채팅창에 치는 중인 글)
    const [socket, setSocket] = useState<Socket | null>(null);
    const chatEndRef = useRef<HTMLDivElement>(null); // 스크롤을 맨 아래로 내리기 위한 참조
    const [userColors, setUserColors] = useState<Record<string, string>>({});

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            if (newMessage.trim() === '') return;
            const messageData = {
                nickname: nickname, // 기본 닉네임 설정
                message: newMessage.trim(), // 공백 제거
            };

            // 메시지를 상태에 추가
            setMessages((currentMsg) => [
                ...currentMsg,
                { nickname: messageData.nickname, message: messageData.message },
            ]);

            console.log("Sending message:", messageData);

            // 서버로 메시지 전송
            socket?.emit('message', messageData);

            // 입력 필드 초기화
            setNewMessage('');
        }
    };

    // 소켓으로 실시간 채팅 내역 불러오기(치지직)
    const getStreamerChat = (streamer: string) => {
        if (streamer) {
            console.log("streamerName", streamer)
            // 소켓이 이미 연결되어 있으면 새로 생성하지 않도록
            if (socket?.connected) {
                console.log('Socket already connected:', streamer);
                return;
            }
            // 기존 소켓이 있으면 정리
            if (socket) {
                socket.disconnect();
            }

            // 새 소켓 연결 생성
            const newSocket = io(process.env.NEXT_PUBLIC_BACK_URL); // WebSocket 서버 URL
            setSocket(newSocket);

            newSocket.on('NoChatChannelId', (data)=>{
                console.log("NoChatChannelId data : ", data)
            })
            
            // 서버와 연결 성공 시 실행
            newSocket.on('connect', () => {
                console.log('Connected to Chzzk WebSocket', streamer);

                // 서버로 스트리머 이름 전송
                newSocket.emit('requestChatData', { streamerName: streamer });
            });

            // 서버로부터 실시간 데이터 수신
            newSocket.on('receiveChatData', (data: { chatData: ChatMessage }) => {
                const { chatData } = data;

                setMessages((currentMsg) => {
                    const updatedMessages = [...currentMsg, { nickname: chatData.nickname, message: chatData.message }];
                    // 최대 채팅갯수를 제한하는 로직 추가
                    if (updatedMessages.length > MAX_MESSAGES) {
                        return updatedMessages.slice(-MAX_MESSAGES);
                    }
                    return updatedMessages;
                });
            });

            // 서버 연결 종료 이벤트 처리
            newSocket.on('disconnect', () => {
                console.log('Disconnected from WebSocket : ', streamer);
            });
        }
        return;
    };

    const getUserColor = (username: string): string => {
        const utils = new util();
        if (!userColors[username]) {
            const newColor = utils.getRandomDarkColor();
            setUserColors((prev) => ({ ...prev, [username]: newColor }));
        }
        return userColors[username];
    };

    useEffect(() => {
        if (streamerName) getStreamerChat(streamerName);
        return () => {
            socket?.off('message');
            socket?.disconnect();
            socket?.on('disconnect', () => {
                console.log('useEffect Disconnected from WebSocket : ', streamerName);
            });
        };
    }, [streamerName]);

    useEffect(() => {
        // 새로운 메시지가 추가될 때 스크롤을 맨 아래로 이동
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // 엔터키를 누르면 sendMessage 함수를 호출
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className="flex flex-col  h-full ">
            {/* <h2 className="text-lg font-bold">채팅창</h2> */}
            <h1 className="text-xl font-bold mb-4 text-center border-b border-gray-700 pb-2">
                채팅창
            </h1>
            <div className="flex-1 mt-2 overflow-y-auto bg-gray-800 no-scrollbar space-y-2 p-4 rounded-t-md">
                {messages.map((msg, index) => (
                    <p key={index} className="p-2 bg-gray-700 rounded">
                        <strong style={{ color: getUserColor(msg.nickname) }}>{msg.nickname}:</strong> {msg.message}
                    </p>
                ))}
                {/* 맨 아래로 스크롤을 위한 요소 */}
                <div ref={chatEndRef} />
            </div>
            <div className="flex mt-2">
                <input
                    className="flex-1 p-2 bg-gray-700 text-white rounded-l-md"
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="채팅을 입력해주세요"
                    onKeyDown={handleKeyPress} // 엔터키 감지
                />
                <button onClick={handleSendMessage} className="bg-blue-500 p-2 rounded-r">
                    전송
                </button>
            </div>
        </div>
    );
};

export default ChatRoom;