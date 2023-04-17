import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { UserRepository } from 'src/database/repositories/user.repository';

@Module({
  imports: [
    DatabaseModule.forFeature([
      UserRepository
    ])
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule { }
