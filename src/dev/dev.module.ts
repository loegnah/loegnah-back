import { HttpModule } from '@nestjs/axios';
import { Module, ModuleMetadata } from '@nestjs/common';

import { DevController } from '#/dev/dev.controller';
import { DevService } from './dev.service';

export const devModuleMeta: ModuleMetadata = {
  imports: [HttpModule],
  controllers: [DevController],
  providers: [DevService],
};

@Module(devModuleMeta)
export class DevModule {}
