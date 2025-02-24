module.exports = [
  require('eslint-config-prettier'),
  {
    languageOptions: {
      ecmaVersion: 2018,
      globals: {
        // Globales para Node
        require: "readonly",
        module: "writable",
        __dirname: "readonly",
        process: "readonly",
        // Globales para Jest
        describe: "readonly",
        it: "readonly",
        test: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
      },
    },
    rules: {
      "no-console": "warn",
    },
  },
];
