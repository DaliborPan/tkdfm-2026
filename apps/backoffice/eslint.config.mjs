import { nextJsConfig } from "@repo/eslint-config/next-js";

export default [
  ...nextJsConfig,
  {
    files: ["*.config.js"],
    rules: {
      "no-undef": "off",
    },
  },
];
