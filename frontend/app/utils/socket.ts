import { io } from 'socket.io-client';

export const socket = io('http://localhost:3000');  // 소켓 서버 주소