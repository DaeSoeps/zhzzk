import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { DatabaseModule } from './database/database.module';
import { ChatGateway } from './chat.gateway';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    BoardsModule,
    DatabaseModule, 
    // TypeOrmModule.forRoot(typeORMConfig),  // DatabaseModule 로 리팩토링 예정
    ConfigModule.forRoot({
      isGlobal: true,           // ConfigService를 전역에서 사용 가능하게 설정
      envFilePath: process.env.NODE_ENV === 'production' ? '.env.production' : '.env',  // .env 파일 경로 (기본값은 프로젝트 루트)
    }),
  ],
  providers: [ChatGateway],

})
export class AppModule {}
