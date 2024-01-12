import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Env } from '#/config/configuration';

const logger = new Logger('Infra');

@Injectable()
export class InfraService {
  private publicIpApiUrl = this.config.get<string>('publicIpApiUrl');

  constructor(
    private http: HttpService,
    private config: ConfigService<Env, true>,
  ) {}

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
