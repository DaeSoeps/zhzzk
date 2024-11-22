import { create } from 'zustand';

interface BroadCastStore {
  isMyStreaming: boolean;
  setIsMyStreaming: (value : boolean) => void;
}

export const useBroadCastStore = create<BroadCastStore>((set) => ({
  isMyStreaming: false, // 초기 상태: 방송 중지
  setIsMyStreaming: (value : boolean) => set(() => ({ isMyStreaming: value })), // 상태 토글
}));