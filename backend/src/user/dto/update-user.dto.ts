import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString, IsOptional, IsEmail, MinLength } from 'class-validator';

// PartialType(CreateUserDto): CreateUserDto의 모든 필드를 선택적으로 만들어줌
// 각 필드에 @IsOptional() 데코레이터를 추가해 부분 업데이트가 가능하도록 함
// 이렇게 DTO를 통해 유효성 검사를 수행하면, 올바르지 않은 데이터가 서버에 전달되는 것을 방지
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email?: string;
}