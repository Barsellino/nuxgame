import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchUsers } from '../api/jsonplaceholder'
import { LOGIN_ERRORS } from '../constants/auth'
import { STORAGE_KEYS } from '../constants/storage'
import { normalizePhone } from '../utils/phone'

function loadStoredUser() {
  const raw = sessionStorage.getItem(STORAGE_KEYS.CURRENT_USER)

  if (!raw) {
    return null
  }

  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export const useAuthStore = defineStore('auth', () => {
  const currentUser = ref(loadStoredUser())
  const loginError = ref('')

  async function login(username, phone) {
    loginError.value = ''

    const trimmedUsername = username.trim()
    const trimmedPhone = phone.trim()

    if (!trimmedUsername || !trimmedPhone) {
      loginError.value = LOGIN_ERRORS.REQUIRED
      return null
    }

    try {
      const users = await fetchUsers()
      const matchedUser = users.find(
        (user) =>
          user.username.toLowerCase() === trimmedUsername.toLowerCase() &&
          normalizePhone(user.phone) === normalizePhone(trimmedPhone),
      )

      if (matchedUser) {
        currentUser.value = matchedUser
        sessionStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(matchedUser))
        return matchedUser
      }

      loginError.value = LOGIN_ERRORS.INVALID
      return null
    } catch {
      loginError.value = LOGIN_ERRORS.NETWORK
      return null
    }
  }

  function clearSession() {
    currentUser.value = null
    loginError.value = ''
    sessionStorage.removeItem(STORAGE_KEYS.CURRENT_USER)
  }

  return { currentUser, loginError, login, clearSession }
})
