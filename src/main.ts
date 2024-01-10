import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { Env } from '#/config/configuration';
import { configureApp } from '#/lib/app';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = configureApp(await NestFactory.create(AppModule));
  const config = app.get(ConfigService<Env, true>);
  await app.listen(config.get('port'));
}

bootstrap();
