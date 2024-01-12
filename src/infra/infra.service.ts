import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Env } from '#/config/configuration';
import { TelegramService } from '#/telegram/telegram.service';

const logger = new Logger('Infra');

@Injectable()
export class InfraService {
  private publicIpApiUrl = this.config.get<string>('publicIpApiUrl');

  constructor(
    private http: HttpService,
    private config: ConfigService<Env, true>,
    private telegramService: TelegramService,
  ) {
    this.initTelegramBot();
  }

  private async initTelegramBot() {
    const bot = this.telegramService.makeBot({
      token: this.config.get('telegramBotToken'),
    });
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
    console.log(this.publicIpApiUrl);
    const ret = await this.http.axiosRef
      .get(this.publicIpApiUrl)
      .catch((err) => {
        logger.error(err);
        throw new Error(
          `Failed to get public IP from '${this.publicIpApiUrl}'`,
        );
      });
    return ret.data.trim();
  }
}
