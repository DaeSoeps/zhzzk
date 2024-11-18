import { io, Socket } from 'socket.io-client';

const socket = io(process.env.NEXT_PUBLIC_BACK_URL);  // 소켓 서버 주소



export {io, socket, Socket};