import { Repository } from 'typeorm';

import { EntityRepository } from "../database.decorators";

import { PostEntity } from '../entities/post.entity';

@EntityRepository(PostEntity)
export class PostRepository extends Repository<PostEntity> { }