export default {
  testEnvironment: 'node',
  transform: {},
  testMatch: ['**/tests/**/*.test.js'],
  collectCoverageFrom: ['**/*.js', '!**/node_modules/**', '!jest.config.js', '!scripts/**'],
  coverageThreshold: {
    global: { branches: 50, functions: 50, lines: 50, statements: 50 },
  },
};
