import { HttpModule } from '@nestjs/axios';
import { Module, ModuleMetadata } from '@nestjs/common';

import { InfraService } from '#/infra/infra.service';
import { TelegramModule } from '#/telegram/telegram.module';

export const infraModuleMeta: ModuleMetadata = {
  imports: [HttpModule, TelegramModule],
  providers: [InfraService],
};

@Module(infraModuleMeta)
export class InfraModule {}
