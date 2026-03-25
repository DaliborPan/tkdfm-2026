import js from "@eslint/js";
import next from "@next/eslint-plugin-next";
import prettier from "eslint-config-prettier/flat";
import formatjs from "eslint-plugin-formatjs";
import jsxA11Y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import unusedImports from "eslint-plugin-unused-imports";
import { defineConfig } from "eslint/config";
import typescriptEslint from "typescript-eslint";

const globs = {
  js: "**/*.{js,cjs,mjs}",
  jsx: "**/*.{jsx,cjsx,mjsx}",
  ts: "**/*.{ts,cts,mts}",
  tsx: "**/*.{tsx,ctsx,mtsx}",
};

const configs = {
  common: defineConfig({
    name: "iqf-web-eslint/common",
    files: [globs.js, globs.jsx, globs.ts, globs.tsx],
    plugins: {
      "unused-imports": unusedImports,
    },
    extends: [js.configs.recommended],
    rules: {
      "dot-notation": "error",
      eqeqeq: ["error", "always"],
      "func-style": [
        "error",
        "declaration",
        {
          allowArrowFunctions: true,
        },
      ],
      "no-duplicate-imports": [
        "error",
        {
          includeExports: true,
        },
      ],
      "no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
      "no-template-curly-in-string": ["error"],
      "no-unused-vars": "off",
      "no-useless-rename": "error",
      "no-var": "error",
      "object-shorthand": ["error", "always"],
      "prefer-arrow-callback": [
        "error",
        {
          allowNamedFunctions: true,
        },
      ],
      "prefer-const": "error",
      "prefer-template": "error",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
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
  }),

  typescript: defineConfig({
    name: "iqf-web-eslint/typescript",
    files: [globs.ts, globs.tsx],
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    extends: [typescriptEslint.configs.recommended],
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
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-empty-function": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "off",
    },
  }),

  react: defineConfig({
    name: "iqf-web-eslint/react",
    files: [globs.js, globs.jsx, globs.ts, globs.tsx],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      formatjs,
    },
    extends: [
      react.configs.flat.recommended,
      react.configs.flat["jsx-runtime"],
      reactHooks.configs.flat.recommended,
      jsxA11Y.flatConfigs.recommended,
    ],
    rules: {
      "formatjs/enforce-default-message": ["error", "literal"],
      "formatjs/enforce-id": ["error"],
      "react/function-component-definition": [
        "error",
        {
          namedComponents: "function-declaration",
          unnamedComponents: "arrow-function",
        },
      ],
      "react/jsx-boolean-value": ["error", "always"],
      "react/jsx-curly-brace-presence": ["error", "never"],
      "react/jsx-curly-spacing": ["error", "never"],
      "react/jsx-equals-spacing": ["error", "never"],
      "react/jsx-fragments": ["error", "syntax"],
      "react/jsx-no-useless-fragment": [
        "error",
        {
          allowExpressions: true,
        },
      ],
      "react/no-array-index-key": "error",
      "react/prop-types": "off",
      "react/self-closing-comp": "error",
      "react-hooks/incompatible-library": "off",
      "react-hooks/refs": "off",
    },
  }),

  next: defineConfig({
    name: "iqf-web-eslint/next",
    files: [globs.js, globs.jsx, globs.ts, globs.tsx],
    plugins: {
      "@next/next": next,
    },
    rules: {
      ...next.configs.recommended.rules,
      ...next.configs["core-web-vitals"].rules,
    },
  }),

  prettier: defineConfig({
    name: "iqf-web-eslint/prettier",
    files: [globs.js, globs.jsx, globs.ts, globs.tsx],
    extends: [prettier],
  }),
};

export default {
  configs: {
    ...configs,
    recommended: {
      vite: defineConfig(
        configs.common,
        configs.typescript,
        configs.react,
        configs.prettier,
      ),
      next: defineConfig(
        configs.common,
        configs.typescript,
        configs.react,
        configs.next,
        configs.prettier,
      ),
    },
  },
};
