import { Module, ModuleMetadata } from '@nestjs/common';

import { PrismaService } from '#/prisma/prisma.service';

export const prismaModuleMeta: ModuleMetadata = {
  providers: [PrismaService],
  exports: [PrismaService],
};

@Module(prismaModuleMeta)
export class PrismaModule {}
