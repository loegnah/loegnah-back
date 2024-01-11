import { ModuleMetadata } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { forRootMeta } from '#/app.module';

export async function makeTestingModule(
  moduleMetaData: ModuleMetadata,
): Promise<TestingModule> {
  return await Test.createTestingModule({
    ...moduleMetaData,
    imports: [...forRootMeta, ...(moduleMetaData.imports ?? [])],
  }).compile();
}
