import { SetMetadata } from '@nestjs/common';

export const ENTITY_REPOSITORY = 'ENTITY_REPOSITORY';
export function EntityRepository(entity: Function): ClassDecorator {
  return SetMetadata(ENTITY_REPOSITORY, entity);
}
