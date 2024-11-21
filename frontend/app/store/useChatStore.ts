import { create } from 'zustand';
import { persist, createJSONStorage } from "zustand/middleware";

type ChatMessage = {
    nickname: string;
    message: string;
    timestamp?: string; // 메시지 작성 시간 (옵션)
};

interface ChatState {
    users: ChatMessage[]; // 모든 메시지 리스트
    addMessage: (nickname: string, message: string) => void; // 새로운 메시지 추가
    clearMessages: () => void; // 메시지 초기화
}

const MAX_MESSAGES = 100; // 최대 메시지 수

const useChatStore = create(persist
    <ChatState>((set) => ({
        users: [], // 초기 상태: 빈 배열

        // 새로운 메시지 추가
        addMessage: (nickname, message) =>
            set((state) => {
                const newMessage: ChatMessage = {
                    nickname,
                    message,
                    timestamp: new Date().toISOString(), // 현재 시간 추가
                };

                const updatedMessages = [...state.users, newMessage];

                return {
                    users:
                        updatedMessages.length > MAX_MESSAGES
                            ? updatedMessages.slice(-MAX_MESSAGES) // 최대 메시지 수 초과 시 오래된 메시지 삭제
                            : updatedMessages,
                };
            }),

        // 메시지 초기화
        clearMessages: () => ({
            users: [],
        }),
    }), {
        name: 'broadCastChat-storage', // name of the item in the storage (must be unique)
        storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
    ));

export default useChatStore;
