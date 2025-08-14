// eslint.config.mjs
import { FlatCompat } from "@eslint/eslintrc";
import tsEslintPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

/** @type {import('eslint').Linter.FlatConfig[]} */
const eslintConfig = [
  // Legacy config compatibility
  ...compat.extends(
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "next/core-web-vitals"
  ),

  // Next.js plugin directly
  {
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      "@next/next/no-html-link-for-pages": "error",
    },
  },
  {
    plugins: {
      "@typescript-eslint": tsEslintPlugin,
    },
    rules: {
      // https://stackoverflow.com/questions/57802057/eslint-configuring-no-unused-vars-for-typescript
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  },

  // TypeScript and JS support
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: join(__dirname, "tsconfig.json"),
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },

  {
    // Note: there should be no other properties in this object
    // https://eslint.org/docs/latest/use/configure/migration-guide#ignoring-files
    // /src/lib/__internal__/middleware.getToken.error.doc.ts , todo : use markdown for anything which is not code file
    ignores: ["**/other/**/*", "node_modules/**/*", "**/*doc.{ts,tsx}"],
  },
];

export default eslintConfig;
