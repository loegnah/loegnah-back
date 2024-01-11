import { ConfigService } from '@nestjs/config';

import { makeApp } from '#/app';
import { ConfigSrvEnv } from '#/config/configuration';

async function bootstrap() {
  const app = await makeApp({ isTest: false });
  const config = app.get<ConfigSrvEnv>(ConfigService);
  await app.listen(config.get('port'));
}

bootstrap();
