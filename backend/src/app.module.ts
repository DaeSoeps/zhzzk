import { Module } from '@nestjs/common';
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
    // TypeOrmModule.forRoot(typeORMConfig)
  ],
  providers: [
    ChatGateway,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    }

  ],

})
export class AppModule {}
