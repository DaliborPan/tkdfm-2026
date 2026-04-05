/* global require */
/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("node:fs");
const i18nFolder = "./src/intl";

function sortObject(obj) {
  return Object.keys(obj)
    .sort()
    .reduce((sorted, key) => {
      sorted[key] = obj[key];
      return sorted;
    }, {});
}

function writeSortedJson(locale, json) {
  const sorted = sortObject(json);

  fs.writeFileSync(
    `${i18nFolder}/${locale}.json`,
    JSON.stringify(sorted, null, 2),
  );
}

function filterObsoleteKeys({ cs, en }) {
  const keysCs = Object.keys(cs);

  Object.keys(en).forEach((key) => {
    if (!keysCs.includes(key)) {
      delete en[key];
    }
  });
}

function clearKeys(obj) {
  Object.keys(obj).forEach((key) => {
    obj[key] = "";
  });
}

function main() {
  const cs = JSON.parse(fs.readFileSync(`${i18nFolder}/cs.json`, "utf8"));
  const en = JSON.parse(fs.readFileSync(`${i18nFolder}/en.json`, "utf8"));

  writeSortedJson("cs", cs);

  clearKeys(cs);
  filterObsoleteKeys({ cs, en });
  writeSortedJson("en", { ...cs, ...en });
}

main();
