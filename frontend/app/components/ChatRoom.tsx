"use client"
import { useState, useEffect } from 'react';
import { socket } from '../utils/socket';

const ChatRoom = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            if (newMessage.trim() === '') return;
            setMessages([...messages, newMessage]);
            // socket.emit('message', messages);
            setNewMessage('');
        }
    };
    
    // useEffect(() => {
    //     socket.on('message', (msg: string) => {
    //         setMessages((prevMessages) => [...prevMessages, msg]);
    //     });

    //     return () => {
    //         socket.off('message');
    //     };
    // }, []);



    return (
        <div className="w-1/6 bg-gray-800 p-4 flex flex-col justify-between">
            <h2 className="text-lg font-bold">채팅창</h2>
            <div className="flex-1 overflow-y-auto space-y-2 mt-4">
                {messages.map((message, index) => (
                    <div key={index} className="p-2 bg-gray-700 rounded">{message}</div>
                ))}
            </div>
            <div className="flex mt-4">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="메시지를 입력하세요"
                    className="flex-1 p-2 bg-gray-700 rounded-l outline-none"
                />
                <button onClick={handleSendMessage} className="bg-blue-500 p-2 rounded-r">
                    전송
                </button>
            </div>
        </div>
    );
};

export default ChatRoom;