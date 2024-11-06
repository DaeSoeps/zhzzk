import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NextFunction, Request, Response } from 'express';
import next from 'next';

async function bootstrap() {
  // Next.js 초기 설정
  const dev = process.env.NODE_ENV !== 'production';
  const nextApp = next({ dev, dir: '../frontend' }); // frontend 디렉토리 설정
  const handle = nextApp.getRequestHandler();

  await nextApp.prepare();

  const app = await NestFactory.create(AppModule);

  // Next.js 요청을 처리하기 위한 미들웨어 설정
  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.path.startsWith('/_next') || req.path.startsWith('/static')) {
      // Next.js의 정적 파일 요청
      handle(req, res);
    } else {
      next(); // NestJS 라우트로 전달
    }
  });

  app.use('*', (req: Request, res: Response) => handle(req, res));

  await app.listen(3000);
}
bootstrap();
