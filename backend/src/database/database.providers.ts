import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

// 데이터베이스 연결 설정을 담당합니다. TypeOrmModule.forRootAsync를 사용하여 ConfigService에서 환경 변수를 가져와 설정합니다.

export const DatabaseConfig = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get<string>('DATABASE_HOST'),
    port: configService.get<number>('DATABASE_PORT'),
    username: configService.get<string>('DATABASE_USER'),
    password: configService.get<string>('DATABASE_PASSWORD'),
    database: configService.get<string>('DATABASE_NAME'),
    synchronize: false, // production에서는 false로 설정하는 것이 안전합니다.
    autoLoadEntities: true, // 엔티티 자동 로딩 설정
  }),
});