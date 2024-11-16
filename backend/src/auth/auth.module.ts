import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../user/user.module'; // 사용자 관리를 위한 UsersModule
import { AuthController } from './auth.controller';

// JWT 전략과 인증 서비스를 구성
@Module({
  imports: [
    UsersModule, // UsersModule에서 사용자 관리 서비스 사용
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecret', // JWT 시크릿 키
      signOptions: { expiresIn: '1h' }, // 토큰 만료 시간
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}