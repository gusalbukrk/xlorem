export default {
  testEnvironment: 'node',
  coverageProvider: 'v8',
  projects: [
    {
      displayName: 'jest',
      preset: 'ts-jest',
      globals: {
        'ts-jest': {
          tsconfig: './tsconfig.jest.json',
        },
      },
      transform: {
        '^.+\\.jsx?$': 'babel-jest', // to also be able to write tests in javascript
        '^.+\\.tsx?$': 'ts-jest',
      },
    },
    {
      displayName: 'eslint',
      runner: 'jest-runner-eslint',
    },
  ],
  watchPlugins: ['jest-runner-eslint/watch-fix'],
};
