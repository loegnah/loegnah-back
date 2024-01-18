import { ConfigService } from '@nestjs/config';
import { TestingModule } from '@nestjs/testing';
import TelegramBot from 'node-telegram-bot-api';

import { ConfigSrvEnv } from '#/config/configuration';
import { PrismaService } from '#/prisma/prisma.service';
import { TelegramModuleMeta } from '#/telegram/telegram.module';
import { TelegramService } from '#/telegram/telegram.service';
import { makeTestingModule } from '#test/lib/test.run';

describe('TelegramService', () => {
  let telegramSrv: TelegramService;
  let config: ConfigSrvEnv;
  let bot: TelegramBot;

  async function makeBot(token?: string): Promise<TelegramBot> {
    return telegramSrv.makeBot({
      token: token ?? config.get('telegramBotToken'),
      name: 'test-bot',
    });
  }

  beforeEach(async () => {
    const module: TestingModule = await makeTestingModule(TelegramModuleMeta);
    telegramSrv = module.get(TelegramService);
    config = module.get(ConfigService);

    module.get(PrismaService).botTelegram.findUnique = jest.fn(
      () => true,
    ) as any;
  });

  it('should be defined', () => {
    expect(telegramSrv).toBeDefined();
  });

  it('makeBot', async () => {
    bot = await makeBot();
    expect(bot).toBeInstanceOf(TelegramBot);
  });

  it('makeBot (wrong token)', (done) => {
    makeBot('wrong-token').then((bot) => {
      bot.on('polling_error', () => {
        expect(true).toBe(true);
        done();
      });
    });
  });
});
