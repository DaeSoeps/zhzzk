import { ref, set, onValue, push, get } from "firebase/database";
import { database } from "./firebase";
import { StaticImageData } from 'next/image';
interface Streamer {
    id: string;
    name: string;
    icon: StaticImageData;
    viewers: number;
    game: string;
    streamType: string;
}

// 스트리머 불러오기
export const getStreamers = async (): Promise<Streamer[]> => {
    const streamersRef = ref(database, "streamers");
    const snapshot = await get(streamersRef);

    if (snapshot.exists()) {
        const data = snapshot.val();

        // 데이터를 배열 형태로 변환
        const streamersArray = Object.keys(data).map((key) => ({
            ...(data[key]),
        }));
        const test = streamersArray[0]
        const result : Streamer[] = Object.keys(test).map(el => test[el]); 

        return result;
    }

    return []; // 데이터가 없으면 빈 배열 반환
};
// 스트리머 추가
export const addStreamer = (streamer: object) => {
    const streamersRef = ref(database, "streamers");
    push(streamersRef, streamer);
};

// 스트리밍 시작
export const startStreaming = (streamerId: string, streamerData: object) => {
    set(ref(database, `streamers/${streamerId}`), streamerData);
};

// 구독
export const subscribeToStreamers = (callback: any) => {
    const streamersRef = ref(database, "streamers");
    onValue(streamersRef, (snapshot) => {
        const data = snapshot.val();
        callback(data);
    });
};