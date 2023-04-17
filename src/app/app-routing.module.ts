import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    RouterModule.register([
      {
        path: 'user',
        module: UserModule
      },
      {
        path: 'post',
        module: PostModule
      }
    ]),
    UserModule,
    PostModule
  ]
})
export class AppRoutingModule { }