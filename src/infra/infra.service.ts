import { HttpService } from '@nestjs/axios';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import TelegramBot from 'node-telegram-bot-api';

import { Env } from '#/config/configuration';
import { TelegramService } from '#/telegram/telegram.service';

const logger = new Logger('Infra');

@Injectable()
export class InfraService implements OnModuleInit {
  private readonly PUBLIC_IP_API_URL =
    this.config.get<string>('publicIpApiUrl');
  private readonly BOT_NAME = 'loegnah-infra';

  private publicIp: string;
  private bot: TelegramBot;

  constructor(
    private http: HttpService,
    private config: ConfigService<Env, true>,
    private telegramService: TelegramService,
  ) {}

  async onModuleInit() {
    await this.initTelegramBot();
    this.publicIp = await this.getPublicIp();
  }

  private async initTelegramBot() {
    this.bot = await this.telegramService.makeBot({
      token: this.config.get('telegramBotToken'),
      name: this.BOT_NAME,
    });
    await this.setTelegramBotListener(this.bot);
  }

  private async setTelegramBotListener(bot: TelegramBot) {
    bot.onText(/\/show (.+)/, async (msg, match) => {
      const chatId = msg.chat.id;
      if (!match) return;
      const what = match[1];
      let resMsg: string;
      if (what === 'public-ip') {
        resMsg = `public ip: ${await this.getPublicIp()}`;
      } else {
        resMsg = 'wrong command';
      }
      await bot.sendMessage(chatId, resMsg);
    });
  }

  async getPublicIp(): Promise<string> {
    const ret = await this.http.axiosRef
      .get(this.PUBLIC_IP_API_URL)
      .catch((err) => {
        logger.error(err);
        throw new Error(
          `Failed to get public IP from '${this.PUBLIC_IP_API_URL}'`,
        );
      });
    const curPublicIp = ret.data.trim();
    if (!this.publicIp !== curPublicIp) {
      this.onPublicIpChanged({ curPublicIp });
    }
    return ret.data.trim();
  }

  private async onPublicIpChanged({ curPublicIp }: { curPublicIp: string }) {
    this.publicIp = curPublicIp;
  }
}
