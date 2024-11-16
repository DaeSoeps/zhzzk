import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3030', // 백엔드 주소
  withCredentials: true,            // 쿠키를 포함하여 요청을 보냄
});

export default api;