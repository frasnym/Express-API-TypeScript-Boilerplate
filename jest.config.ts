// jest.config.ts
import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testEnvironmentOptions: {
    NODE_ENV: 'test'
  },
  setupFilesAfterEnv: ['./tests/setup.ts'],
  coveragePathIgnorePatterns: [
    'node_modules',
    'src/config',
    'src/app.ts',
    'tests'
  ]
}

export default config
