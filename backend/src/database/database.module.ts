import { Module } from '@nestjs/common';
import { DatabaseConfig } from './database.providers';

// DatabaseConfig를 DatabaseModule에 등록하여 애플리케이션의 다른 모듈에서 사용할 수 있도록 합니다.

@Module({
  imports: [DatabaseConfig],
  exports: [DatabaseConfig], // 다른 모듈에서 사용 가능하도록 export
})
export class DatabaseModule {}