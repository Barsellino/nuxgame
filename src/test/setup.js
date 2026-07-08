import { beforeEach, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { resetUsersCache } from '../api/jsonplaceholder'

beforeEach(() => {
  sessionStorage.clear()
  localStorage.clear()
  vi.restoreAllMocks()
  resetUsersCache()
  setActivePinia(createPinia())
})
