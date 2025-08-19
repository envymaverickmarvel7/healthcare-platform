import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  // Global ignores applied to all configs
  globalIgnores([
    "node_modules/",
    "dist/",
    "build/",
    "*.config.js",
    "*.config.cjs",
    "*.config.mjs",
    "*.config.ts",
  ]),

  // Base config for JavaScript files
  {
    files: ["**/*.js", "**/*.cjs", "**/*.mjs"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        // Add any global variables if needed here
      },
    },
    rules: {
      semi: "error",
      "no-unused-vars": "warn",
      "prefer-const": "error",
    },
  },

  // Config for test files
  {
    files: ["**/tests/**/*.js", "**/*.test.js", "**/*.spec.js"],
    languageOptions: {
      globals: {
        describe: "readonly",
        it: "readonly",
        expect: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        jest: "readonly",
      },
    },
    rules: {
      "no-console": "off",
      "no-unused-expressions": "off",
    },
  },

  // Config for TypeScript files
  {
    files: ["**/*.ts", "**/*.mts", "**/*.cts"],
    languageOptions: {
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./tsconfig.json",
        sourceType: "module",
      },
    },
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
    ],
    plugins: ["@typescript-eslint"],
    rules: {
      // Add TypeScript-specific rules here
    },
  },
]);