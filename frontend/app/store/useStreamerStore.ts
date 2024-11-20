import { create } from 'zustand';
import { StaticImageData } from 'next/image';

// 스트리머 타입 정의
type Streamer = {
    id: string;
    name: string;
    icon: StaticImageData;
    viewers: number;
    game: string;
    streamType: string;
};

// 스토어 상태와 동작 정의
interface StreamerStore {
    streamers: Streamer[]; // 스트리머 리스트
    fetchStreamers: () => Promise<void>; // API 호출
    addStreamer: (streamer: Streamer[]) => void; // 스트리머 추가
    setStreamer: (streamer: Streamer[]) => void; // 기본 스트리머(fetchStreamers 로 대체 필요)
    updateStreamer: (name: string, data: Partial<Streamer>) => void; // 스트리머 정보 업데이트
    getStreamerByName: (name: string) => Streamer | undefined; // 특정 스트리머 가져오기
}

// Zustand 스토어 생성
const useStreamerStore = create<StreamerStore>((set, get) => ({
    streamers: [],

    // 스트리머 리스트를 API로부터 가져오는 함수
    fetchStreamers: async () => {
        try {
            const response = await fetch('https://api.example.com/streamers'); // 예시 API
            const data: Streamer[] = await response.json();
            set({ streamers: data });
        } catch (error) {
            console.error('Failed to fetch streamers:', error);
        }
    },

    // 최초 스트리머 추가 TODO: 추후에 fetchStreamers 로 구현
    setStreamer: (streamer: Streamer[]) => {
        set((state) => ({
            streamers: streamer,
        }));
    },

    // 스트리머 추가
    addStreamer: (streamers: Streamer[]) => {
        set((state) => {
            // 중복 Name 를 제외한 새로운 스트리머만 추가
            const existingIds = state.streamers.map((s) => s.name);
            const newStreamers = streamers.filter((streamer) => !existingIds.includes(streamer.name));
            return {
                streamers: [...state.streamers, ...newStreamers],
            };
        });
    },

    // 특정 스트리머 업데이트, 스트리머 id보다는 이름을 고유의 값으로 판단하고 구현
    updateStreamer: (name, data) => {
        set((state) => ({
            streamers: state.streamers.map((streamer) =>
                streamer.name === name ? { ...streamer, ...data } : streamer
            ),
        }));
    },

    // 특정 스트리머 정보 가져오기
    getStreamerByName: (name) => {
        const streamers = get().streamers;
        return streamers.find((streamer) => streamer.name === name);
    },
}));

export default useStreamerStore;