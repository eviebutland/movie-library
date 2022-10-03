export function convertToKebabCase(string) {
  return string.toLowerCase().trim().replaceAll(' ', '-')
}
