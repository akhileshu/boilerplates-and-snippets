// eslint.config.mjs
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import tsParser from "@typescript-eslint/parser";
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

  // Global rules
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/components/*"],
              message: "Import from '@/components' only (use the index file).",
            },
            {
              group: ["@/lib/*"],
              message: "Import from '@/lib' only (use the index file).",
            },
            {
              group: ["@/services/*"],
              message: "Import from '@/services' only (use the index file).",
            },
          ],
        },
      ],
    },
  },

  // Allow deep imports in specific files
  {
    files: [
      "src/components/index.ts",
      "src/components/app/**/*.{ts,tsx}",
      "src/lib/index.ts",
      "src/lib/app/**/*.{ts,tsx}",
      "src/services/index.ts",
      "src/services/app/**/*.{ts,tsx}",
    ],
    rules: {
      "no-restricted-imports": "off",
    },
  },
  {
    // Note: there should be no other properties in this object
    // https://eslint.org/docs/latest/use/configure/migration-guide#ignoring-files
    ignores: ["**/other/**/*", "node_modules/**/*"],
  },
];


export default eslintConfig;
