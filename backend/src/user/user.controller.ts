import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt')) // JWT 인증이 필요한 엔드포인트
  @Get(':id')
  async findOne(@Param('id') id: number) {
    const user = await this.usersService.findById(id);
    if (user) {
      const { password, ...result } = user; // 비밀번호는 제외하고 반환
      return result;
    }
    return null;
  }
}