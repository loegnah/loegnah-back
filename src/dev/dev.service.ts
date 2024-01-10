import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Env } from '#/config/configuration';

@Injectable()
export class DevService {
  constructor(
    private config: ConfigService<Env, true>,
    private http: HttpService,
  ) {}

  getHello(): string {
    console.log(`Port: ${this.config.get('port')}`);
    return 'Hello World!';
  }

  async getPublicIp() {
    const ret = await this.http.axiosRef.get('http://icanhazip.com');
    return ret.data.trim();
  }
}
