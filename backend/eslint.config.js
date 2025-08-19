import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  // Global ignores applied to all configurations
  globalIgnores([
    "node_modules/",
    "dist/",
    "build/",
    "*.config.js",
    "*.config.cjs",
    "*.config.mjs",
    "*.config.ts",
  ]),

  // Base config for all JavaScript files
  {
    files: ["**/*.js", "**/*.cjs", "**/*.mjs"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        // Add your globals here if needed
      },
    },
    rules: {
      semi: "error",
      "no-unused-vars": "warn",
      "prefer-const": "error",
    },
  },

  // Override/add config for test files
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

  // Override for TypeScript files
  {
    files: ["**/*.ts", "**/*.mts", "**/*.cts"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
    ],
    plugins: ["@typescript-eslint"],
    rules: {
      // Add TS-specific rules here
    },
  },
]);
