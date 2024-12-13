import { Controller, Get, Query } from '@nestjs/common';
import { TwitchService } from './twitch.service';

@Controller('twitch')
export class TwitchController {
  constructor(private readonly twitchService: TwitchService) {}

  @Get('streamer')
  // async getStreamerInfo(@Query('name') streamerName: string) 
  // => 단일로 불러올땐 이렇게 해야함.
  async getStreamerInfo() {
    const streamerNames = ["Zizaran","Quin69","wudijo"];
    return await this.twitchService.getStreamerInfo(streamerNames);
  }
}