export function normalizePhone(value) {
  return String(value).toLowerCase().split('x')[0].replace(/\D/g, '')
}
