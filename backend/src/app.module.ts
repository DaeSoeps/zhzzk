import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { DatabaseModule } from './database/database.module';
// import { typeORMConfig } from './configs/typeorm.config';
import { ChatGateway } from './chat.gateway';
import { ConfigModule } from '@nestjs/config';
// 회원가입 및 인증
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/user.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { TwitchGateway } from './twitch/twitch.gateway';
import { TwitchModule } from './twitch/twitch.module';
import * as cors from 'cors';

@Module({
  imports: [
    // BoardsModule,
    // DatabaseModule,
    // UsersModule,
    // AuthModule,
    ThrottlerModule.forRoot([{
      ttl: 1000,
      limit: 1,
    }]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'production' ? '.env.production' : '.env',
    }),
    TwitchModule,
    // TypeOrmModule.forRoot(typeORMConfig)
  ],
  providers: [
    ChatGateway,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    TwitchGateway

  ],

})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cors({
          origin: [
            'https://zhzzk.onrender.com', // 배포 환경 URL
            'http://localhost:3000', // 개발 환경 URL
          ],
          methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
          credentials: true,
        }),
      )
      .forRoutes('*');
  }

}
