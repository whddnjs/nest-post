import { Provider } from '@nestjs/common';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

import { ENTITY_REPOSITORY } from './database.decorators';

export function createDatabaseProviders<T extends new (...args: any[]) => any>(
  repositories: T[],
  dataSource?: string | DataSourceOptions | DataSource
): Provider[] {
  return (repositories || []).map((repository) => {
    return {
      provide: repository,
      inject: [getDataSourceToken(dataSource)],
      useFactory: (dataSource: DataSource) => {
        const entity = Reflect.getMetadata(ENTITY_REPOSITORY, repository);
        const baseRepository = dataSource.getRepository(entity);
        return new repository(baseRepository.target, baseRepository.manager, baseRepository.queryRunner);
      },
    }
  });
}
