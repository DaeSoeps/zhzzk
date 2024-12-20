import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import * as ChzzkClient from 'chzzk-custom';
import { EventEmitter } from 'events';

@Injectable()
export class ChzzkChatService extends EventEmitter {
  private readonly logger = new Logger('ChzzkChatService');
  private client: any;
  private chzzkChat: any;

  // 실시간 채팅 메시지를 저장하는 변수
  private chatMessages: string[] = [];

  constructor(streamerName: string) {
    super();
    this.initializeClient(streamerName);
  }

  // 치지직 클라이언트 초기화
  private async initializeClient(streamerName: string) {
    this.client = new ChzzkClient.ChzzkClient();

    const channelName = streamerName;
    const result = await this.client.search.channels(channelName);
    const channel = result.channels[0];

    if (!channel) {
      this.logger.error(`Channel "${channelName}" not found.`);
      return;
    }

    const liveDetail = await this.client.live.detail(channel.channelId);

    if (liveDetail) {
      const media = liveDetail.livePlayback?.media ? liveDetail.livePlayback.media : null;
      if (media) {
        const hls = media.find((media) => media.mediaId === 'HLS');

        if (hls) {
          const m3u8 = await this.client.fetch(hls.path).then((r) => r.text());
          this.logger.log(`HLS Playlist: ${m3u8}`);
        }
      }
    }



    // 채팅 연결
    this.connectChat(channel.channelId);
  }

  // 채팅 연결 및 이벤트 설정
  private connectChat(channelId: string) {
    this.chzzkChat = this.client.chat({
      channelId,
      // chatChannelId 의 변경을 감지하기 위한 polling 요청의 주기 (선택사항, ms 단위)
      // channelId를 지정할 경우 자동으로 30초로 설정됨, 0초로 설정 시 polling 요청을 하지 않음
      pollInterval: 30 * 1000, // 30초마다 변경 감지
    });

    this.chzzkChat.on('connect', () => {
      this.logger.log('Connected to Chzzk Chat');
      this.chzzkChat.requestRecentChat(50); // 최근 50개 채팅 요청
    });

    // 재연결 (방송 시작 시
    this.chzzkChat.on('reconnect', (newChatChannelId: string) => {
      this.logger.log(`Reconnected to Chat Channel: ${newChatChannelId}`);
    });

    // 채팅채널이 없는경우
    this.chzzkChat.on('NoChatChannelId', (streamerStatus: object) => {
      this.emit('NoChatChannelId', streamerStatus);
    });

    // 일반 채팅 수신
    this.chzzkChat.on('chat', (chat: any) => {
      const message = chat.hidden ? '[블라인드 처리 됨]' : chat.message;
      const nickname = chat.profile.nickname;

      // 메시지를 저장
      this.chatMessages.push(`${nickname}: ${message}`);
      //   this.logger.log(`New Message: ${nickname}: ${message}`);
      this.emit('newMessage', { nickname, message });
    });

    this.chzzkChat.on('subscription', (subscription: any) => {
      this.logger.log(
        `${subscription.profile.nickname} 님이 ${subscription.extras.month} 개월 동안 ${subscription.extras.tierName} 구독중`,
      );
    });

    this.chzzkChat.on('systemMessage', (systemMessage: any) => {
      this.logger.log(`System Message: ${systemMessage.extras.description}`);
    });

    this.chzzkChat.on('notice', (notice: any) => {
      this.logger.log(`Notice: ${notice}`);
    });

    this.chzzkChat.on('disconnect', (reason: string) => {
      this.logger.error(`Disconnected from Chzzk Chat. Reason: ${reason}`);
      this.handleDisconnection(reason);
    });

    // 채팅 연결
    this.chzzkChat.connect();
  }

  // 외부에서 실시간 메시지 접근
  public getChatMessages(): string[] {
    return this.chatMessages;
  }

  // 서비스 종료 시 자원 정리
  public async onModuleDestroy() {
    if (this.chzzkChat) {
      if(this.chzzkChat.connected){
        await this.chzzkChat.disconnect();
      }
      this.logger.log('Disconnected from Chzzk Chat');
    }
  }

  private async handleDisconnection(reason: string) {
    this.logger.warn(`Handling disconnection. Reason: ${reason}`);
    try {
      this.onModuleDestroy();

    } catch (error) {
      this.logger.error(`handleDisconnection failed: ${error.message}`);

    }
  }
}