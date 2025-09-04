export function parseToNumber(str: string | null) {
  if (!str || (str && isNaN(parseInt(str, 10)))) return 0;
  return +str;
}
