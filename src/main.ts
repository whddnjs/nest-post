import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe, ValidationPipeOptions } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const validationPipeOptions: ValidationPipeOptions = {
    transform: true
  }
  const validationPipe = new ValidationPipe(validationPipeOptions)
  app.useGlobalPipes(validationPipe);

  const port = process.env.APP_PORT;
  await app.listen(port);
}
bootstrap();
