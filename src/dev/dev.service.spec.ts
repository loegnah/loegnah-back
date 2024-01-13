import { ConfigService } from '@nestjs/config';
import { TestingModule } from '@nestjs/testing';

import { ConfigSrvEnv } from '#/config/configuration';
import { devModuleMeta } from '#/dev/dev.module';
import { makeTestingModule } from '#test/lib/test.run';
import { DevService } from './dev.service';

describe('DevService', () => {
  let devSrv: DevService;
  let config: ConfigSrvEnv;

  function nothing() {}

  beforeEach(async () => {
    const module: TestingModule = await makeTestingModule(devModuleMeta);
    devSrv = module.get<DevService>(DevService);
    config = module.get<ConfigSrvEnv>(ConfigService);
  });

  it('should be defined', () => {
    nothing();
    expect(devSrv).toBeDefined();
    expect(config).toBeDefined();
  });
});
