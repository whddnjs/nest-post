import { Injectable } from '@nestjs/common';
import { PostEntity } from 'src/database/entities/post.entity';
import { PostRepository } from 'src/database/repositories/post.repository';

import { PostDto } from './post.dto';

@Injectable()
export class PostService {

  constructor(
    private readonly postRepository: PostRepository
  ) { }

  async create(dto: PostDto.Request.Create): Promise<PostEntity> {
    const entity = this.postRepository.create(dto);
    return await this.postRepository.save(entity);
  }

  findAll(): Promise<PostEntity[]> {
    return this.postRepository.find();
  }

  findOne(id: number): Promise<PostEntity> {
    return this.postRepository.findOne({
      where: { id }
    });
  }

  async update(postEntity: PostEntity, dto: PostDto.Request.Update): Promise<PostEntity> {
    const entity = this.postRepository.create({
      ...postEntity,
      title: dto.title,
      content: dto.content
    });
    return await this.postRepository.save(entity);
  }

  async remove(postEntity: PostEntity): Promise<PostEntity> {
    return await this.postRepository.remove(postEntity);
  }
}