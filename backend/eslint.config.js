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
        // Add any global variables your project needs here
      },
    },
    rules: {
      semi: "error",             // Requires semicolons
      "no-unused-vars": "warn",  // Warn on unused variables
      "prefer-const": "error",   // Prefer const if variable is never reassigned
      // Add your other general rules here
    },
  },

  // Override/add config for test files
  {
    files: ["**/__tests__/**/*.js", "**/*.test.js", "**/*.spec.js"],
    languageOptions: {
      globals: {
        // Common test globals
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
      // Relaxed rules for tests if needed
      "no-console": "off",
      "no-unused-expressions": "off"
    },
  },

  // Override for TypeScript files (if using TS)
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
    plugins: {
      "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
    },
    rules: {
      // Add TypeScript specific rules here
    },
  }
]);