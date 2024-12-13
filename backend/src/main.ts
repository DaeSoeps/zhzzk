import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';
const { Server } = require('socket.io');
const http = require('http');

async function bootstrap() {
  // Next.js 초기 설정
  const dev = process.env.NODE_ENV !== 'production';

  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // CORS 설정
  app.enableCors({
    origin: configService.get<string>('ORIGIN'),// 프론트엔드 주소
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // 필요한 경우, 쿠키와 같은 인증 정보를 포함할 수 있도록 설정
  });

  // Preflight 요청 명시적으로 처리
  app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Origin', configService.get<string>('ORIGIN'));
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.header('Access-Control-Allow-Credentials', 'true');
      res.status(204).send(); // No Content
    } else {
      next();
    }
  });

  const port = configService.get<number>('PORT', 3030);
  console.log("port : ", port, configService.get<string>('ORIGIN'), process.env.NODE_ENV)


  // Signaling 서버 부분

  const server = http.createServer(app);
  const io = new Server(server);
  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // WebRTC signaling message 처리
    socket.on('offer', (data) => {
      socket.broadcast.emit('offer', data);
    });

    socket.on('answer', (data) => {
      socket.broadcast.emit('answer', data);
    });

    socket.on('ice-candidate', (data) => {
      socket.broadcast.emit('ice-candidate', data);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  await app.listen(port);
}
bootstrap();
