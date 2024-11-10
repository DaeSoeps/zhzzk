import { Controller, Post, Body, Request, UseGuards, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';

//로그인과 회원가입 API를 제공합니다.
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { username: string; password: string }) {
    const user = await this.authService.validateUser(
      loginDto.username,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() registerDto: { username: string; password: string }) {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    // 실제 UsersService를 통해 사용자 등록 로직 작성
    return this.authService.register({
      username: registerDto.username,
      password: hashedPassword,
    });
  }
}