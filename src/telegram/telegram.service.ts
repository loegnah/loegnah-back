import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import TelegramBot from 'node-telegram-bot-api';

import { Env } from '#/config/configuration';

@Injectable()
export class TelegramService {
  private bot: TelegramBot;

  constructor(private config: ConfigService<Env, true>) {
    this.bot = new TelegramBot(this.config.get('telegramBotToken'), {
      polling: true,
    });
    this.setBotListener().catch((err) => {
      console.error(err);
    });
  }

  private async setBotListener() {
    this.bot.onText(/\/echo (.+)/, (msg, match) => {
      const chatId = msg.chat.id;
      if (!match) return;
      const resp = match[1];
      this.bot.sendMessage(chatId, resp);
    });

    this.bot.on('message', (msg) => {
      const chatId = msg.chat.id;
      this.bot.sendMessage(chatId, 'Received your message');
    });
  }
}
