module.exports = {
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json'
    }
  },
  moduleFileExtensions: [
    'ts',
    'js',
    'json'
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  testMatch: [
    '**/test/**/*.test.ts'
  ],
  testPathIgnorePatterns:['node_modules/.*'],
  testEnvironment: 'node',
  collectCoverageFrom: ['src/**/*.ts'],
  coveragePathIgnorePatterns: ['src/eventstore/client']
};
