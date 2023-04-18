import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AuthModule } from 'src/auth/auth.module';

import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    RouterModule.register([

      {
        path: 'auth',
        module: AuthModule
      },
      {
        path: 'post',
        module: PostModule
      },
      {
        path: 'user',
        module: UserModule
      }
    ]),
    AuthModule,
    PostModule,
    UserModule
  ]
})
export class AppRoutingModule { }