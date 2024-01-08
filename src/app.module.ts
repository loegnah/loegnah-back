import { Module, ModuleMetadata } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

export const AppModuleMeta: ModuleMetadata = {
  imports: [],
  controllers: [AppController],
  providers: [AppService],
};

@Module(AppModuleMeta)
export class AppModule {}
