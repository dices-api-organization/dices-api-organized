/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: ["./dist"],
  testMatch:["**/**/*.test.ts"],
  verbose: true,
  forceExit: true,
  //clearMocks: true,
};