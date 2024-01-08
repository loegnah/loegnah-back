import { Test, TestingModule } from '@nestjs/testing';

import { AppModuleMeta } from '#/app.module';
import { configureApp } from '#/lib/app';
import { TEST_PORT } from './test.const';

export async function makeTestingApp({ listen = false }: { listen?: boolean }) {
  const testingModule: TestingModule =
    await Test.createTestingModule(AppModuleMeta).compile();

  const app = configureApp(testingModule.createNestApplication());
  await app.init();
  if (listen) {
    app.getHttpServer().listen(TEST_PORT);
  }
  return app;
}
