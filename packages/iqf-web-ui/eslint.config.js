import { defineConfig } from "eslint/config";
import { eslint } from "iqf-web-eslint";

export default defineConfig({
  extends: [eslint.configs.recommended.vite],
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
  },
});
