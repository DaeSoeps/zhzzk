import { io, Socket } from 'socket.io-client';

const socket = io('http://localhost:3030');  // 소켓 서버 주소



export {io, socket, Socket};