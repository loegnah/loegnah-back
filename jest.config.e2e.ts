import { Config } from 'jest';

import testConfig from './jest.config';

const e2eTestConfig: Config = {
  ...testConfig,
  rootDir: './test',
  moduleNameMapper: {
    '^#/(.*)$': '<rootDir>/../src/$1',
  },
  testRegex: '.e2e-spec.ts$',
};
export default e2eTestConfig;
