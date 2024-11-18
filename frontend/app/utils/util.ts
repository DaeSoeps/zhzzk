import { StaticImageData } from 'next/image';
import finn from '../../public/streamer/finn.png';
import iceking from '../../public/streamer/ice-king.png';
import jake from '../../public/streamer/jake.png';
import marceline from '../../public/streamer/marceline.png';
import bmo from '../../public/streamer/bmo.png';
import flameprincess from '../../public/streamer/flameprincess.png';
import gunter from '../../public/streamer/gunter.png';
import lumpyspaceprincess from '../../public/streamer/lumpyspaceprincess.png';
import princessbubblegum from '../../public/streamer/princessbubblegum.png';

export class dummyStreamerInfo {
    // 아이콘 출처 : https://icons8.kr/icon/set/characters/group-color
    streamerImages = [
        finn,
        iceking,
        jake,
        marceline,
        bmo,
        flameprincess,
        gunter,
        lumpyspaceprincess,
        princessbubblegum
    ];

    // 랜덤 숫자 생성
    public getRandomNumber = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    // 랜덤 이름 생성
    public getRandomName = () => {
        const names = ['배돈', '풍월량', '김도', '한동숙', '녹두로'];
        return names[this.getRandomNumber(0, names.length - 1)];
    };

    // 랜덤 게임 생성
    public getRandomGame = () => {
        const games = ['League of Legends', 'Valorant', 'Overwatch', 'Minecraft', 'GTA V'];
        return games[this.getRandomNumber(0, games.length - 1)];
    };

    // 랜덤 스트림 타입
    public getRandomStreamType = () => {
        const streamTypes = ['CHZZK']; // 'Twitch', 'YouTube'
        return streamTypes[this.getRandomNumber(0, streamTypes.length - 1)];
    };

    // 랜덤 이미지를 선택하는 함수
    public getRandomImage = (): StaticImageData => {

        const randomIndex = Math.floor(Math.random() * this.streamerImages.length);
        return this.streamerImages[randomIndex];
    };

    // 배열 무작위 섞기 (Fisher-Yates Shuffle 알고리즘)
    public shuffleArray = <T>(array: T[]): T[] => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    // 중복없는 이미지를 가져오는 함수
    public getUniqueImages = (count: number): StaticImageData[] => {
        const shuffledImages = this.shuffleArray(this.streamerImages);
        return shuffledImages.slice(0, count); // 필요한 개수만큼 반환
    };

    // 중복없는 이름 생성
    public getUniqueName = (count: number) => {
        const names = ['배돈', '풍월량', '김도', '한동숙', '녹두로', '울프', '인간젤리', '똘똘똘이', '철면수심', '지니어스매드'];
        const shuffledImages = this.shuffleArray(names);
        return shuffledImages.slice(0, count); // 필요한 개수만큼 반환
    };



}


export class helper {
    // 얕은 색의 랜덤컬러 생성 함수
    public getRandomDarkColor = (): string => {
        const hue = Math.floor(Math.random() * 360);
        const saturation = Math.random() * 0.5 + 0.5;
        const value = Math.random() * 0.4 + 0.3;

        const c = value * saturation;
        const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
        const m = value - c;

        let r = 0,
            g = 0,
            b = 0;

        if (hue < 60) [r, g, b] = [c, x, 0];
        else if (hue < 120) [r, g, b] = [x, c, 0];
        else if (hue < 180) [r, g, b] = [0, c, x];
        else if (hue < 240) [r, g, b] = [0, x, c];
        else if (hue < 300) [r, g, b] = [x, 0, c];
        else[r, g, b] = [c, 0, x];

        r = Math.round((r + m) * 255);
        g = Math.round((g + m) * 255);
        b = Math.round((b + m) * 255);

        return `rgb(${r}, ${g}, ${b})`;
    };
}