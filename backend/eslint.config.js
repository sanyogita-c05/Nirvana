import globals from "globals";
import js from "@eslint/js";

export default [
  {
    files: ["src/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  {
    files: ["tests/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.node,
        describe: "readonly",
        test: "readonly",
        it: "readonly",
        expect: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
      },
    },
  },

  js.configs.recommended,
];