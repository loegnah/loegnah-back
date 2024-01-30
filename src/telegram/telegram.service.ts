import { Injectable, Logger } from '@nestjs/common';
import { BotTelegram, Prisma } from '@prisma/client';
import TelegramBot from 'node-telegram-bot-api';

import { PrismaService } from '#/prisma/prisma.service';

const logger = new Logger('Telegram');

@Injectable()
export class TelegramService {
  constructor(private prisma: PrismaService) {}

  async makeBot(params: { token: string }): Promise<TelegramBot> {
    const { token } = params;
    return new TelegramBot(token, {
      polling: true,
    });
  }

  async getOrCreateBotInfo(params: {
    name: string;
    bot: TelegramBot;
  }): Promise<BotTelegram> {
    const { name, bot } = params;
    let botInfo = await this.findBot(name);
    if (!botInfo) {
      const chatId = await this.waitStartCmdToGetChatId(bot);
      botInfo = await this.createBot({ name, chatId });
    }
    return botInfo;
  }

  private async findBot(name: string): Promise<BotTelegram | null> {
    logger.verbose('isStoreBot', name);
    return this.prisma.botTelegram.findUnique({
      where: {
        name,
      },
    });
  }

  private async waitStartCmdToGetChatId(
    bot: TelegramBot,
  ): Promise<BotTelegram['chatId']> {
    logger.verbose('waiting start cmd to get chat id....');
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(
        () => {
          reject(new Error('Timeout to wait start cmd to get chat id'));
        },
        1000 * 60 * 5,
      );
      bot.onText(/\/start/, async (msg) => {
        logger.verbose(`Done. (chatId: ${msg.chat.id})`);
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
