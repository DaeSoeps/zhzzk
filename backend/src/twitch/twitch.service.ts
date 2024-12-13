import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs'; // RxJS를 사용하여 HTTP 요청 결과 처리

@Injectable()
export class TwitchService {
  private clientId = 'slya9puzot7sjt6m12cymymtbwgc5r'; // 발급받은 Client ID
  private clientSecret = 'shsrfj4w0e2rc9t8htqsvk559hdolv'; // 발급받은 Client Secret
  private accessToken: string | null = null;

  constructor(private readonly httpService: HttpService) {}

  async getAccessToken(): Promise<string> {
    if (!this.accessToken) {
      const response$ = this.httpService.post(
        'https://id.twitch.tv/oauth2/token',
        null,
        {
          params: {
            client_id: this.clientId,
            client_secret: this.clientSecret,
            grant_type: 'client_credentials',
          },
        },
      );

      const response = await lastValueFrom(response$); // Observable을 Promise로 변환
      this.accessToken = response.data.access_token;
    }
    return this.accessToken;
  }

  async getStreamerInfo(streamerNames: string[]) {
    const accessToken = await this.getAccessToken();
  // Streamer 이름들을 쉼표로 연결하여 쿼리로 추가
  const params = streamerNames.map(name => `user_login=${name}`).join('&');
  
  const response$ = this.httpService.get(
    `https://api.twitch.tv/helix/streams?${params}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Client-ID': this.clientId,
      },
    },
  );

  const response = await lastValueFrom(response$);
  return response.data.data; // 스트리머 정보 배열 반환
  }
}