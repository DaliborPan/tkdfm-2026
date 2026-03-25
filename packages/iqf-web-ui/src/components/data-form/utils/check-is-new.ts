export function checkIsNew(itemId: string | undefined) {
  return !!itemId && decodeURIComponent(itemId) === "+";
}
