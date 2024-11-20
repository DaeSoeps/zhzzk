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
    this.server.emit('message', data);
  }

  // 특정 이벤트 처리 (실시간 채팅 데이터 요청)
  @SubscribeMessage('requestChatData')
  handleRequestChatData(client: Socket, data: { streamerName: string }) {
    const { streamerName } = data;
    this.logger.log(`Chat data requested for streamer: ${streamerName}`);
    // const chzzk = new ChzzkChatService(streamerName);
    // const chatData =  chzzk.getChatMessages;

    // // 클라이언트에게 실시간 데이터 전송
    // client.emit('receiveChatData', { chatData });

    // 이미 생성된 ChzzkChatService가 있으면 재사용
    // if (!this.chatServices.has(streamerName)) {}

    const chzzkChatService = new ChzzkChatService(streamerName);
    this.chatServices.set(streamerName, chzzkChatService);

    // 새로운 메시지 발생 시 클라이언트에 전송
    chzzkChatService.on('newMessage', (message) => {
      this.server.to(client.id).emit('receiveChatData', { chatData: message });
    });


    // 기존 메시지 반환
    const service = this.chatServices.get(streamerName);
    if (service) {
      client.emit('receiveChatData', { chatData: service.getChatMessages() });
    }
  }
}