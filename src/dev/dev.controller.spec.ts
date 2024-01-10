import { TestingModule } from '@nestjs/testing';

import { DevController } from '#/dev/dev.controller';
import { devModuleMeta } from '#/dev/dev.module';
import { makeTestingModule } from '#test/lib/test.run';

describe('DevController', () => {
  let devCntr: DevController;

  beforeEach(async () => {
    const module: TestingModule = await makeTestingModule(devModuleMeta);
    devCntr = module.get<DevController>(DevController);
  });

  it('should return "Hello World!"', () => {
    expect(devCntr.getHello()).toEqual({ message: 'Hello World!' });
  });
});
