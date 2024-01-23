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
  doInit = true,
): Promise<TestingModule> {
  const module = await Test.createTestingModule({
    ...moduleMetaData,
    imports: [...forRootMeta, ...(moduleMetaData.imports ?? [])],
  }).compile();
  if (doInit) {
    await module.init();
  }
  return module;
}
