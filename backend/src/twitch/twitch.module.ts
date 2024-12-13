import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TwitchService } from './twitch.service';
import { TwitchController } from './twitch.controller';

@Module({
  imports: [HttpModule],
  controllers: [TwitchController],
  providers: [TwitchService],
})
export class TwitchModule {}