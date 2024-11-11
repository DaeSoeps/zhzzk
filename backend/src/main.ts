import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';


async function bootstrap() {
  // Next.js 초기 설정
  const dev = process.env.NODE_ENV !== 'production';
  
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // CORS 설정
  app.enableCors({
    origin: 'http://localhost:3000', // configService.get<string>('ORIGIN'), // 프론트엔드 주소
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,                // 필요한 경우, 쿠키와 같은 인증 정보를 포함할 수 있도록 설정
  });

  const port = configService.get<number>('PORT', 3030);
  console.log("port : ", port, configService.get<string>('ORIGIN'))
  await app.listen(port);
}
bootstrap();
