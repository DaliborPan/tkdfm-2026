import { config as baseConfig } from "@repo/eslint-config/base";

export default [
  ...baseConfig,
  {
    ignores: ["generated/**"],
  },
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "turbo/no-undeclared-env-vars": [
        "error",
        {
          allowList: ["NODE_ENV"],
        },
      ],
    },
  },
];
