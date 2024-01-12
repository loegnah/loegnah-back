import { ModuleMetadata } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { makeApp } from '#/app';
import { forRootMeta } from '#/app.module';
import { ConfigSrvEnv } from '#/config/configuration';

export async function makeTestingApp({ listen = false }: { listen?: boolean }) {
  const app = await makeApp({ isTest: true });
  if (listen) {
    const config = app.get<ConfigSrvEnv>(ConfigService);
    app.getHttpServer().listen(config.get('port'));
  }
  return app;
}

export async function makeTestingModule(
  moduleMetaData: ModuleMetadata,
): Promise<TestingModule> {
  return await Test.createTestingModule({
    ...moduleMetaData,
    imports: [...forRootMeta, ...(moduleMetaData.imports ?? [])],
  }).compile();
}
