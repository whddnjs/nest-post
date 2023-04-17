import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';

import { AppRoutingModule } from './app-routing.module';

@Module({
  imports: [
    DatabaseModule,
    AppRoutingModule
  ]
})
export class AppModule { }
