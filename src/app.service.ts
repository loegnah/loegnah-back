import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Env } from '#/config/configuration';

@Injectable()
export class AppService {
  constructor(private config: ConfigService<Env, true>) {}

  getHello(): string {
    console.log(this.config.get('port'));
    return 'Hello World!';
  }
}
