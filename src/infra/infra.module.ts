import { HttpModule } from '@nestjs/axios';
import { Module, ModuleMetadata } from '@nestjs/common';

import { InfraService } from '#/infra/infra.service';

export const infraModuleMeta: ModuleMetadata = {
  imports: [HttpModule],
  providers: [InfraService],
};

@Module(infraModuleMeta)
export class InfraModule {}
