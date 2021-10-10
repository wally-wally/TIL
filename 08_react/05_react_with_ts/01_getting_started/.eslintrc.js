module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
  ],
  parserOptions: {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        'singleQuote': true,
        'semi': true,
        'useTabs': false,
        'tabWidth': 2,
        'trailingComma': 'all',
        'bracketSpacing': true,
        'printWidth': 120,
        'arrowParens': 'always',
        "endOfLine": "auto"
      }
    ],
  },
};