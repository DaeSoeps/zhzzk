import { ref, set, onValue } from "firebase/database";
import { database } from "./firebase";

export const startStreaming = (streamerId: string, streamerData: object) => {
    set(ref(database, `streamers/${streamerId}`), streamerData);
};

export const subscribeToStreamers = (callback: any) => {
    const streamersRef = ref(database, "streamers");
    onValue(streamersRef, (snapshot) => {
        const data = snapshot.val();
        callback(data);
    });
};