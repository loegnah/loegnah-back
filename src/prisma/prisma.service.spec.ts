import { TestingModule } from '@nestjs/testing';

import { prismaModuleMeta } from '#/prisma/prisma.module';
import { PrismaService } from '#/prisma/prisma.service';
import { makeTestingModule } from '#test/lib/test.run';

describe('DevService', () => {
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await makeTestingModule(prismaModuleMeta);
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(prisma).toBeDefined();
  });
});
