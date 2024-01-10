import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Env } from '#/config/configuration';

@Injectable()
export class AppService {
  constructor(
    private config: ConfigService<Env, true>,
    private http: HttpService,
  ) {}

  getHello(): string {
    console.log(this.config.get('port'));
    return 'Hello World!';
  }

  async getPublicIp() {
    const ret = await this.http.axiosRef.get('http://icanhazip.com');
    return ret.data.trim();
  }
}
