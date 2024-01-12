import { Module, ModuleMetadata } from '@nestjs/common';

import { TelegramService } from '#/telegram/telegram.service';

export const TelegramModuleMeta: ModuleMetadata = {
  providers: [TelegramService],
};

@Module(TelegramModuleMeta)
export class TelegramModule {}
