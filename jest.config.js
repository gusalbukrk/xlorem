export default {
  testEnvironment: 'node',
  coverageProvider: 'v8',
  extensionsToTreatAsEsm: ['.ts'],
  projects: [
    {
      displayName: 'jest',
      preset: 'ts-jest',
      globals: {
        'ts-jest': {
          tsconfig: './tsconfig.json',
          useESM: true,
        },
      },
      transform: {
        '^.+\\.jsx?$': 'babel-jest', // to also be able to write tests in javascript
        '^.+\\.tsx?$': 'ts-jest',
      },

      // https://github.com/kulshekhar/ts-jest/issues/1057#issuecomment-1068342692
      moduleNameMapper: {
        '(.+)\\.js': '$1',
      },
      extensionsToTreatAsEsm: ['.ts'],
    },
    {
      displayName: 'eslint',
      runner: 'jest-runner-eslint',
    },
  ],
  watchPlugins: ['jest-runner-eslint/watch-fix'],
};
