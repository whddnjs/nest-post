import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRepository } from 'src/database/repositories/user.repository';

import { AuthDto } from './auth.dto';
import { UserEntity } from 'src/database/entities/user.entity';
import { Payload } from './auth.type';

@Injectable()
export class AuthService {

  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
  ) { }

  getUser(username: string) {
    return this.userRepository.findOne({
      where: { username }
    })
  }

  signUp(dto: AuthDto.Request.SignUp) {
    const userEntity = this.userRepository.create({
      ...dto,
      password: bcrypt.hashSync(dto.password, 10)
    });
    return this.userRepository.save(userEntity);
  }

  signIn(user: UserEntity) {
    const { id, username } = user;

    const payload: Payload = {
      id,
      username
    }
    return this.jwtService.sign(payload)

  }

}
