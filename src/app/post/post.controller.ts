import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from './post.dto';
import { PostEntity } from 'src/database/entities/post.entity';
import { User } from 'src/auth/auth.decorators';
import { UserEntity } from 'src/database/entities/user.entity';

@Controller()
export class PostController {

  constructor(
    private readonly postService: PostService
  ) { }

  @Post()
  create(
    @User() user: UserEntity,
    @Body() dto: PostDto.Request.Create
  ): Promise<PostEntity> {
    const { id } = user;
    return this.postService.create(id, dto);
  }

  @Get()
  findAll(): Promise<PostEntity[]> {
    return this.postService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<PostEntity> {
    const postEntity = await this.postService.findOne(id);
    if (!postEntity) {
      throw new NotFoundException('해당 아이디의 게시글이 없습니다.');
    }
    return postEntity;
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: PostDto.Request.Update): Promise<PostEntity> {
    const postEntity = await this.findOne(id);

    return this.postService.update(postEntity, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<PostEntity> {
    const postEntity = await this.findOne(id);

    return this.postService.remove(postEntity);
  }

}
