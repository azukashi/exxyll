module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  ignorePatterns: ['/commands/*', '/SlashCommands/*'],
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {},
};
