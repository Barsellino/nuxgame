export function filterUsernameInput(value) {
  return value.replace(/[^a-zA-Z._]/g, '')
}

export function filterPhoneInput(value) {
  return value.replace(/[a-wy-z]/gi, '')
}
