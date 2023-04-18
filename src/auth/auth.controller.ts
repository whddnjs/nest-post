import { Body, ConflictException, Controller, Post, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { AuthDto } from './auth.dto';
import { AuthService } from './auth.service';
import { plainToInstance } from 'class-transformer';
import { UserDTO } from 'src/app/user/user.dto';

@Controller()
export class AuthController {

  constructor(
    private readonly authService: AuthService
  ) { }

  @Post('/signup')
  async signup(@Body() dto: AuthDto.Request.SignUp) {
    const { username } = dto;

    const user = await this.authService.getUser(username);
    if (user) {
      throw new ConflictException('이미 가입된 아이디 입니다.');
    }

    const result = await this.authService.signUp(dto);
    return plainToInstance(UserDTO.Response.User, result);

  }

  @Post('/signin')
  async signin(@Body() dto: AuthDto.Request.SignIn) {
    const { username, password } = dto;

    const user = await this.authService.getUser(username);
    if (!user) {
      throw new UnauthorizedException('존재하지 않는 아이디입니다.');
    }

    const isSamePassword = await bcrypt.compare(password, user.password);
    if (!isSamePassword) {
      throw new UnauthorizedException('아이디 또는 비밀번호를 확인해 주세요.');
    }

    const accessToken = this.authService.signIn(user);
    return plainToInstance(AuthDto.Response.AccessToken, { accessToken });

  }
}
