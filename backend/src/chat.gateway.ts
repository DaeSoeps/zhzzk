import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { ChzzkChatService } from './chzzkAPI';


@WebSocketGateway({
  cors: {
    origin: '*', // 필요시 CORS 설정
  },
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  private readonly logger = new Logger('ChatGateway');
  private chatServices: Map<string, ChzzkChatService> = new Map();
  private clientToStreamerMap: Map<string, string> = new Map(); // 클라이언트와 스트리머의 매핑을 관리.

  afterInit(server: Server) {
    console.log('Socket server initialized');
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  // 클라이언트가 'message' 이벤트를 통해 메시지를 전송할 때 호출
  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: { nickname: string, message: string }): void {
    console.log("send ! : ", data)
    // 모든 클라이언트에게 메시지를 전송
    this.server.emit('message', { nickname: data.nickname, message: data.message });
  }

  // 아래부터 치지직 채팅 소켓

  // 특정 이벤트 처리 (실시간 채팅 데이터 요청)
  @SubscribeMessage('requestChatData')
  handleRequestChatData(client: Socket, data: { streamerName: string }) {
    const { streamerName } = data;
    this.logger.log(`Chat data requested for streamer: ${streamerName}`);

    // 클라이언트와 스트리머 매핑 저장
    this.clientToStreamerMap.set(client.id, streamerName);

    // 이미 생성된 ChzzkChatService가 있으면 재사용
    // if (!this.chatServices.has(streamerName)) {
    if (true) {
      this.logger.log(`신규 추가 streamer: ${streamerName}`);
      const chzzkChatService = new ChzzkChatService(streamerName);
      this.chatServices.set(streamerName, chzzkChatService);
      
      // 새로운 메시지 발생 시 클라이언트에 전송
      chzzkChatService.on('newMessage', (message) => {
        this.server.to(client.id).emit('receiveChatData', { chatData: message });
      });

      // 채팅채널이 없는경우
      chzzkChatService.on('NoChatChannelId', (streamerStatus :object) => {
        this.server.to(client.id).emit('NoChatChannelId', { streamerName: streamerName, streamerStatus });
      });
    }


    // 기존 메시지 반환
    const service = this.chatServices.get(streamerName);
    if (service) {
      client.emit('receiveChatData', { chatData: service.getChatMessages() });
    }

    // 클라이언트의 disconnect 이벤트 처리
    client.on('disconnect', () => {
      this.logger.log(`Client disconnected! : ${client.id}`);

      // 매핑에서 스트리머 이름 가져오기
      const disconnectedStreamer = this.clientToStreamerMap.get(client.id);

      if (disconnectedStreamer) {
        this.logger.log(`Cleaning up for streamer: ${disconnectedStreamer}`);

        // 리소스 정리
        const service = this.chatServices.get(disconnectedStreamer);
        if (service) {
          service.removeAllListeners(); // 등록된 이벤트 제거
          this.chatServices.delete(disconnectedStreamer); // 서비스클래스에서 제거
          service.onModuleDestroy();
          this.logger.log(`Service for streamer ${disconnectedStreamer} has been cleaned up.`);
        }

        // 매핑 정보 삭제
        this.clientToStreamerMap.delete(client.id);
      }
    });
  }
}