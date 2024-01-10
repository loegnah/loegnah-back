import { TestingModule } from '@nestjs/testing';

import { DevController } from '#/dev/dev.controller';
import { devModuleMeta } from '#/dev/dev.module';
import { makeTestingModule } from '#test/lib/test.run';

describe('DevController', () => {
  let devCntr: DevController;

  // functions

  function nothing() {}

  // before, after

  beforeEach(async () => {
    const module: TestingModule = await makeTestingModule(devModuleMeta);
    devCntr = module.get<DevController>(DevController);
  });

  // testing

  it('should return "Hello World!"', () => {
    nothing();
    expect(devCntr.getHello()).toEqual({ message: 'Hello World!' });
  });
});
