import { NestFactory } from '@nestjs/core';

import { configureApp } from '#/lib/app';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = configureApp(await NestFactory.create(AppModule));
  await app.listen(3000);
}

bootstrap();
