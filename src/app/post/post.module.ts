import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { PostRepository } from 'src/database/repositories/post.repository';

import { PostController } from './post.controller';
import { PostService } from './post.service';


@Module({
  imports: [
    DatabaseModule.forFeature([
      PostRepository
    ])
  ],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule { }
