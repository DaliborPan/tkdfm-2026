export default {
  plugins: ["@trivago/prettier-plugin-sort-imports"],
  importOrder: [
    "^react$",
    "^next(?:/.*)?$",
    "<THIRD_PARTY_MODULES>",
    "^@repo/(.*)$",
    "^@/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
