import { TestingModule } from '@nestjs/testing';

import { devModuleMeta } from '#/dev/dev.module';
import { makeTestingModule } from '#test/lib/test.run';
import { DevService } from './dev.service';

describe('DevService', () => {
  let service: DevService;

  beforeEach(async () => {
    const module: TestingModule = await makeTestingModule(devModuleMeta);
    service = module.get<DevService>(DevService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
