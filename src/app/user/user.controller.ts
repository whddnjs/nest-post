import { Body, Controller, Get, NotFoundException, Put, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/auth/auth.decorators';
import { UserEntity } from 'src/database/entities/user.entity';
import { plainToInstance } from 'class-transformer';
import { UserDTO } from './user.dto';

import * as bcrypt from 'bcrypt';

@Controller()
export class UserController {

  constructor(
    private readonly userService: UserService
  ) { }

  @Get()
  profile(
    @User() user: UserEntity
  ) {
    console.log(user);
    const userEntity = plainToInstance(UserDTO.Response.User, user);
    console.log(userEntity);

    if (!userEntity) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    return userEntity;
  }

  @Put('nickname')
  async updateNickname(
    @User() user: UserEntity,
    @Body() dto: UserDTO.Request.Nickname
  ) {
    this.profile(user);

    const result = await this.userService.setNickname(user, dto);
    return plainToInstance(UserDTO.Response.User, result);
  }

  @Put('password')
  async updatePassword(
    @User() user: UserEntity,
    @Body() dto: UserDTO.Request.Password
  ) {
    this.profile(user);

    const isSamePassword = await bcrypt.compare(dto.currentPassword, user.password);
    if (!isSamePassword) {
      throw new UnauthorizedException('현재 비밀번호를 확인해 주세요.');
    }

    const result = await this.userService.setPassword(user, dto);
    return plainToInstance(UserDTO.Response.User, result);
  }

}

