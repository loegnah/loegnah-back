import { Module, ModuleMetadata } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { initConfig } from '#/config/configuration';
import { AppController } from './app.controller';
import { AppService } from './app.service';

export const forRootMeta: ModuleMetadata['imports'] = [
  ConfigModule.forRoot({
    isGlobal: true,
    cache: true,
    expandVariables: true,
    load: [initConfig],
  }),
];

export const appModuleMeta: ModuleMetadata = {
  imports: [...forRootMeta],
  controllers: [AppController],
  providers: [AppService],
};

@Module(appModuleMeta)
export class AppModule {}
