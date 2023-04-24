import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/database/entities/user.entity';
import { UserRepository } from 'src/database/repositories/user.repository';

import { UserDTO } from './user.dto';

@Injectable()
export class UserService {

  constructor(
    private readonly userRepository: UserRepository
  ) { }

  getUser(username: string) {
    return this.userRepository.findOne({
      where: { username }
    });
  }

  setNickname(user: UserEntity, dto: UserDTO.Request.Nickname) {
    const userEntity = this.userRepository.create({
      ...user,
      nickname: dto.nickname
    });
    return this.userRepository.save(userEntity);
  }

  setPassword(user: UserEntity, dto: UserDTO.Request.Password) {
    const userEntity = this.userRepository.create({
      ...user,
      password: bcrypt.hashSync(dto.newPassword, 10)
    });
    return this.userRepository.save(userEntity);
  }

  remove(user: UserEntity) {
    return this.userRepository.remove(user);
  }

}
