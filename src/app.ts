import { INestApplication, NestApplicationOptions } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Test } from '@nestjs/testing';

import { AppModule, appModuleMeta } from '#/app.module';

const nestAppOption: NestApplicationOptions = { cors: true };

export async function makeApp({
  isTest = false,
}: {
  isTest?: boolean;
}): Promise<INestApplication<any>> {
  const app = await (isTest ? createTestingApp() : createApp());
  await app.init();
  return app;
}

async function createApp() {
  return await NestFactory.create(AppModule, nestAppOption);
}

async function createTestingApp() {
  return (
    await Test.createTestingModule(appModuleMeta).compile()
  ).createNestApplication(nestAppOption);
}
