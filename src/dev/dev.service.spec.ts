import { ConfigService } from '@nestjs/config';
import { TestingModule } from '@nestjs/testing';

import { ConfigSrvEnv } from '#/config/configuration';
import { devModuleMeta } from '#/dev/dev.module';
import { makeTestingModule } from '#test/lib/test.run';
import { DevService } from './dev.service';

describe('DevService', () => {
  let service: DevService;
  let config: ConfigSrvEnv;

  // functions

  function nothing() {}

  // before, after

  beforeEach(async () => {
    const module: TestingModule = await makeTestingModule(devModuleMeta);
    service = module.get<DevService>(DevService);
    config = module.get<ConfigSrvEnv>(ConfigService);
  });

  // testing

  it('should be defined', () => {
    nothing();
    expect(service).toBeDefined();
    expect(config).toBeDefined();
  });
});
