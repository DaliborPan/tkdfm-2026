export function omit<T extends object, K extends string[]>(
  obj: T,
  keys: K,
): Pick<T, Exclude<keyof T, K[number]>> {
  return Object.fromEntries(
    Object.entries(obj).filter(([k]) => !keys.includes(k)),
  ) as any;
}
