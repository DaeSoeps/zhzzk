import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { ChatGateway } from './chat.gateway';
@Module({
  imports: [
    BoardsModule,
    TypeOrmModule.forRoot(typeORMConfig)
  ],
  providers: [ChatGateway],

})
export class AppModule {}
