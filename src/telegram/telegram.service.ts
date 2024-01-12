import { Injectable } from '@nestjs/common';
import TelegramBot from 'node-telegram-bot-api';

@Injectable()
export class TelegramService {
  makeBot(params: { token: string }): TelegramBot {
    const { token } = params;
    return new TelegramBot(token, {
      polling: true,
    });
  }
}
