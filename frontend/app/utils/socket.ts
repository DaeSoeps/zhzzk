import { io } from 'socket.io-client';

export const socket = io('http://localhost:3030');  // 소켓 서버 주소