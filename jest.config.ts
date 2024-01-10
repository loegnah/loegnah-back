import type { Config } from 'jest';

const testConfig: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  moduleNameMapper: {
    '^#/(.*)$': '<rootDir>/$1',
    '^#test/(.*)$': '<rootDir>/../test/$1',
  },
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  watchman: false,
  setupFiles: ['dotenv/config'],
  forceExit: true,
};

export default testConfig;
