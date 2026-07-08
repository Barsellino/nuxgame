import { STORAGE_KEYS } from '../constants/storage'

export function requireAuth() {
  const raw = sessionStorage.getItem(STORAGE_KEYS.CURRENT_USER)
  return raw ? true : '/'
}
