import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Env } from '#/config/configuration';

@Injectable()
export class DevService {
  constructor(private config: ConfigService<Env, true>) {}

  getHello(): string {
    console.log(`Port: ${this.config.get('port')}`);
    return 'Hello World!';
  }
}
