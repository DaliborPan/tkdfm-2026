import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import turboPlugin from "eslint-plugin-turbo";
import unusedImports from "eslint-plugin-unused-imports";
import tseslint from "typescript-eslint";

export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx,cts,mts,ctsx,mtsx}"],
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    rules: {
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/consistent-type-exports": [
        "error",
        {
          fixMixedExportsWithInlineTypeSpecifier: true,
        },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          fixStyle: "inline-type-imports",
        },
      ],
    },
  },
  {
    plugins: {
      turbo: turboPlugin,
      "unused-imports": unusedImports,
    },
    rules: {
      "no-unused-vars": "off",
      "no-duplicate-imports": [
        "error",
        {
          includeExports: true,
        },
      ],
      "object-shorthand": ["error", "always"],
      "@typescript-eslint/no-unused-vars": "off",
      "turbo/no-undeclared-env-vars": "warn",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  {
    ignores: ["dist/**"],
  },
];
