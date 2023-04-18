import { Injectable } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

@Injectable()
export class AuthFactory implements JwtOptionsFactory {

  constructor(
    private readonly configService: ConfigService
  ) { }

  createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.configService.get('JWT_SECRET')
    }
  }
}
