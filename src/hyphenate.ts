/**
 * Convert string in camelCase to kebab-case
 * @param value string for convertion
 * @returns string
 * */

export function camelToKebabCase(value: string) {
  return value.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
