export function formatBytes(bytes: number): string {
  const units = ["bytes", "kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  if (bytes === 0) return "0 bytes";

  let exponent = Math.floor(Math.log(bytes) / Math.log(1000));
  exponent = Math.min(exponent, units.length - 1);

  const number = bytes / Math.pow(1000, exponent);
  const precision = number < 10 ? 1 : 0;

  return `${number.toFixed(precision)} ${units[exponent]}`;
}
