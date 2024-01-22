import { ConfigService } from '@nestjs/config';
import { TestingModule } from '@nestjs/testing';
import { BotTelegram } from '@prisma/client';
import TelegramBot from 'node-telegram-bot-api';

import { ConfigSrvEnv } from '#/config/configuration';
import { PrismaService } from '#/prisma/prisma.service';
import { TelegramModuleMeta } from '#/telegram/telegram.module';
import { TelegramService } from '#/telegram/telegram.service';
import { makeTestingModule } from '#test/lib/test.run';

describe('TelegramService', () => {
  const BOT_NAME = 'test-bot';
  let telegramSrv: TelegramService;
  let module: TestingModule;
  let config: ConfigSrvEnv;
  let bot: TelegramBot;

  async function makeBot(token?: string): Promise<TelegramBot> {
    return telegramSrv.makeBot({
      token: token ?? config.get('telegramBotToken'),
    });
  }

  function mockPrismaFindUnique(retValue?: BotTelegram) {
    module.get(PrismaService).botTelegram.findUnique = jest.fn(
      () => retValue || null,
    ) as any;
  }

  beforeEach(async () => {
    module = await makeTestingModule(TelegramModuleMeta);
    telegramSrv = module.get(TelegramService);
    config = module.get(ConfigService);
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

  it('getOrCreateBotInfo', async () => {
    const BOT_INFO: BotTelegram = {
      chatId: BigInt(123),
      name: BOT_NAME,
      id: 123,
    };
    mockPrismaFindUnique(BOT_INFO);
    bot = await makeBot();
    const botInfo = await telegramSrv.getOrCreateBotInfo({
      bot,
      name: BOT_NAME,
    });
    expect(botInfo).toEqual(BOT_INFO);
  });
});
