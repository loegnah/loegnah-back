import { Controller, Get } from '@nestjs/common';

import { DevService } from '#/dev/dev.service';

@Controller('dev')
export class DevController {
  constructor(private devSrv: DevService) {}

  @Get()
  getHello() {
    return { message: this.devSrv.getHello() };
  }

  @Get('ip/public')
  async getIpPublic() {
    return { publicIp: await this.devSrv.getPublicIp() };
  }
}
