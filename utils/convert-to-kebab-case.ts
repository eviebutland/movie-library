export function convertToKebabCase(string: string) {
  return string.toLowerCase().trim().replaceAll(' ', '-')
}
