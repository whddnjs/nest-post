import { Repository } from 'typeorm';

import { EntityRepository } from "../database.decorators";

import { UserEntity } from '../entities/user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> { }