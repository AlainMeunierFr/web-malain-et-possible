/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '\\.(css|scss|sass)$': 'identity-obj-proxy',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testMatch: [
      '**/__tests__/**/*.ts?(x)',
      '**/?(*.)+(spec|test).ts?(x)',
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    transform: {
      '^.+\\.tsx?$': ['ts-jest', {
        tsconfig: {
          jsx: 'react',
        },
      }],
    },
    collectCoverageFrom: [
      'components/**/*.{ts,tsx}',
      'utils/**/*.{ts,tsx}',
      '!**/*.d.ts',
      '!**/*.test.{ts,tsx}',
      '!**/node_modules/**',
    ],
    coverageReporters: ['json-summary', 'text', 'lcov', 'html'],
  };
  