import { Module, ModuleMetadata } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { initConfig } from '#/config/configuration';
import { DevModule } from '#/dev/dev.module';
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
  imports: [...forRootMeta, DevModule, TelegramModule],
};

@Module(appModuleMeta)
export class AppModule {}
