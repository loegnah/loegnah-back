import { ConfigService } from '@nestjs/config';
import { TestingModule } from '@nestjs/testing';
import TelegramBot from 'node-telegram-bot-api';

import { ConfigSrvEnv } from '#/config/configuration';
import { TelegramModuleMeta } from '#/telegram/telegram.module';
import { TelegramService } from '#/telegram/telegram.service';
import { makeTestingModule } from '#test/lib/test.run';

describe('TelegramService', () => {
  let telegramSrv: TelegramService;
  let config: ConfigSrvEnv;
  let bot: TelegramBot;

  function makeBot(token?: string): TelegramBot {
    return telegramSrv.makeBot({
      token: token ?? config.get('telegramBotToken'),
    });
  }

  beforeEach(async () => {
    const module: TestingModule = await makeTestingModule(TelegramModuleMeta);
    telegramSrv = module.get<TelegramService>(TelegramService);
    config = module.get<ConfigSrvEnv>(ConfigService);
  });

  it('should be defined', () => {
    expect(telegramSrv).toBeDefined();
  });

  it('makeBot', () => {
    bot = makeBot();
    expect(bot).toBeInstanceOf(TelegramBot);
  });

  it('makeBot (wrong token)', (done) => {
    bot = makeBot('wrong-token');
    bot.on('polling_error', () => {
      expect(true).toBe(true);
      done();
    });
  });
});
