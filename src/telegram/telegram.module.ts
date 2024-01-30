import { Module, ModuleMetadata } from '@nestjs/common';

import { PrismaModule } from '#/prisma/prisma.module';
import { TelegramService } from '#/telegram/telegram.service';

export const TelegramModuleMeta: ModuleMetadata = {
  imports: [PrismaModule],
  providers: [TelegramService],
  exports: [TelegramService],
};

@Module(TelegramModuleMeta)
export class TelegramModule {}
