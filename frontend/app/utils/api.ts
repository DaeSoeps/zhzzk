import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACK_URL, // 백엔드 주소
  withCredentials: true,            // 쿠키를 포함하여 요청을 보냄
});

export default api;