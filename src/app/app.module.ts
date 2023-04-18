import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from 'src/database/database.module';

import { AppRoutingModule } from './app-routing.module';

@Module({
  imports: [
    DatabaseModule,
    AppRoutingModule,
    AuthModule
  ]
})
export class AppModule { }
