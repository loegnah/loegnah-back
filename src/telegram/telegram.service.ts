import { Injectable, Logger } from '@nestjs/common';
import { BotTelegram, Prisma } from '@prisma/client';
import TelegramBot from 'node-telegram-bot-api';

import { PrismaService } from '#/prisma/prisma.service';

const logger = new Logger('Telegram');

@Injectable()
export class TelegramService {
  constructor(private prisma: PrismaService) {}

  async makeBot(params: { token: string; name: string }): Promise<TelegramBot> {
    const { token, name } = params;
    const bot = new TelegramBot(token, {
      polling: true,
    });
    if (!(await this.isStoreBot(name))) {
      const chatId = await this.waitStartCmdToGetChatId(bot);
      await this.createBot({ name, chatId });
    }
    return bot;
  }

  private async isStoreBot(name: string): Promise<boolean> {
    logger.verbose('isStoreBot', name);
    const bot = await this.prisma.botTelegram.findUnique({
      where: {
        name,
      },
    });
    return !!bot;
  }

  private async waitStartCmdToGetChatId(
    bot: TelegramBot,
  ): Promise<BotTelegram['chatId']> {
    logger.verbose('waitStartCmdToGetChatId');
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(
        () => {
          reject(new Error('Timeout to wait start cmd to get chat id'));
        },
        1000 * 60 * 5,
      );
      bot.onText(/\/start/, async (msg) => {
        clearTimeout(timeout);
        resolve(BigInt(msg.chat.id));
      });
    });
  }

  private async createBot(
    data: Prisma.Args<typeof this.prisma.botTelegram, 'create'>['data'],
  ): Promise<BotTelegram> {
    logger.verbose('createBot', data);
    return this.prisma.botTelegram.create({
      data,
    });
  }
}
