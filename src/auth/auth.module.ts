import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from 'src/database/database.module';
import { UserRepository } from 'src/database/repositories/user.repository';
import { AuthFactory } from './auth.factory';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { AuthStrategy } from './auth.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    PassportModule.register({
      session: true
    }),
    JwtModule.registerAsync({
      useClass: AuthFactory
    }),
    DatabaseModule.forFeature([
      UserRepository
    ])

  ],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    AuthService,
    AuthStrategy
  ]
})
export class AuthModule { }
