/** @type {import('jest').Config} */
const config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  coveragePathIgnorePatterns: [
      "main.ts",
      "index.ts",
      "config",
      "node_modules",
      ".*\\.module\\.ts$",
      ".*\\.enum\\.ts$",
      ".*\\.type\\.ts$",
      ".*\\.interface\\.ts$",
      ".*\\.dto\\.ts$",
      ".*\\.e2e-spec\\.ts$"
  ],
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}

module.exports = config;

