import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DataSource, DataSourceOptions } from 'typeorm';

import { ENTITY_REPOSITORY } from './database.decorators';
import { DatabaseFactory } from './database.factory';
import { createDatabaseProviders } from './database.providers';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseFactory
    })
  ]
})
export class DatabaseModule {

  static forFeature<T extends new (...args: any[]) => any>(
    repositories: T[],
    dataSource?: string | DataSourceOptions | DataSource
  ) {
    const entities = repositories.map((repository) => {
      return Reflect.getMetadata(ENTITY_REPOSITORY, repository);
    })

    const module = TypeOrmModule.forFeature(entities);
    const providers = createDatabaseProviders(repositories, dataSource);

    module.providers = [
      ...module.providers,
      ...providers
    ];
    module.exports = [
      ...module.exports,
      ...providers
    ];
    return module;
  }
}