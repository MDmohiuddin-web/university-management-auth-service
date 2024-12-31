import { defineConfig } from 'eslint-define-config';

export default defineConfig({
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  env: {
    browser: true,
    es2024: true
  },
  languageOptions: {
    globals: globals.browser
  },
  rules: {
    eqeqeq: 'off',
    'no-unused-vars': 'error',
    'prefer-const': ['error', { ignoreReadBeforeAssign: true }]
  }
});
