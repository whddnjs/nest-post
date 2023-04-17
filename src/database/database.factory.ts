import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class DatabaseFactory implements TypeOrmOptionsFactory {

  constructor(
    private readonly configService: ConfigService
  ) { }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      charset: 'utf8mb4',
      extra: {
        charset: 'utf8mb4_unicode_ci'
      },
      timezone: '-09:00',
      host: this.configService.get('DB_HOST'),
      port: this.configService.get('DB_PORT'),
      username: this.configService.get('DB_USERNAME'),
      password: this.configService.get('DB_PASSWORD'),
      database: this.configService.get('DB_NAME'),
      logging: false,
      logger: 'advanced-console',
      entities: [`${__dirname}/entities/*.entity.{ts,js}`],
      synchronize: true,
      autoLoadEntities: true
    }
  }
}
