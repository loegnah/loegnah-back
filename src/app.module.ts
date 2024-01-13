import { Module, ModuleMetadata } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { initConfig } from '#/config/configuration';
import { DevModule } from '#/dev/dev.module';
import { InfraModule } from './infra/infra.module';
import { TelegramModule } from './telegram/telegram.module';

export const forRootMeta: NonNullable<ModuleMetadata['imports']> = [
  ConfigModule.forRoot({
    isGlobal: true,
    cache: true,
    expandVariables: true,
    load: [initConfig],
  }),
];

export const appModuleMeta: ModuleMetadata = {
  imports: [...forRootMeta, DevModule, TelegramModule, InfraModule],
};

@Module(appModuleMeta)
export class AppModule {}
