/** @type {import("eslint").Linter.Config} */
const config = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  plugins: ['@typescript-eslint'],
  ignorePatterns: ['dist', 'node_modules', '!.*.*'],
  parser: '@typescript-eslint/parser',
}

module.exports = config
