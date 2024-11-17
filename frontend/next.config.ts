import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*', // 프론트엔드 요청 경로
        destination: 'https://api.chzzk.naver.com/:path*', // 외부 API 주소
      },
    ];
  }
};

export default nextConfig;
