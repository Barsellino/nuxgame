import { describe, expect, it, vi } from 'vitest'
import * as api from '../api/jsonplaceholder'
import { LOGIN_ERRORS } from '../constants/auth'
import { STORAGE_KEYS } from '../constants/storage'
import { mockUser } from '../test/fixtures'
import { useAuthStore } from './auth'

describe('auth store', () => {
  it('logs in successfully and stores user', async () => {
    vi.spyOn(api, 'fetchUsers').mockResolvedValue([mockUser])
    const store = useAuthStore()

    const result = await store.login('Bret', '1-770-736-8031 x56442')

    expect(result).toEqual(mockUser)
    expect(store.currentUser).toEqual(mockUser)
    expect(store.loginError).toBe('')
    expect(sessionStorage.getItem(STORAGE_KEYS.CURRENT_USER)).toBe(JSON.stringify(mockUser))
  })

  it('matches username case-insensitively', async () => {
    vi.spyOn(api, 'fetchUsers').mockResolvedValue([mockUser])
    const store = useAuthStore()

    const result = await store.login('bret', '1-770-736-8031 x56442')

    expect(result).toEqual(mockUser)
  })

  it('trims username before login', async () => {
    vi.spyOn(api, 'fetchUsers').mockResolvedValue([mockUser])
    const store = useAuthStore()

    const result = await store.login('  Bret  ', '1-770-736-8031 x56442')

    expect(result).toEqual(mockUser)
  })

  it('returns null and sets invalid error for wrong credentials', async () => {
    vi.spyOn(api, 'fetchUsers').mockResolvedValue([mockUser])
    const store = useAuthStore()

    const result = await store.login('Wrong', '000')

    expect(result).toBeNull()
    expect(store.loginError).toBe(LOGIN_ERRORS.INVALID)
    expect(store.currentUser).toBeNull()
  })

  it('returns null for empty fields', async () => {
    const store = useAuthStore()

    const result = await store.login('  ', ' ')

    expect(result).toBeNull()
    expect(store.loginError).toBe(LOGIN_ERRORS.REQUIRED)
  })

  it('handles network errors', async () => {
    vi.spyOn(api, 'fetchUsers').mockRejectedValue(new Error('network'))
    const store = useAuthStore()

    const result = await store.login('Bret', '1-770-736-8031 x56442')

    expect(result).toBeNull()
    expect(store.loginError).toBe(LOGIN_ERRORS.NETWORK)
  })

  it('clears session', async () => {
    vi.spyOn(api, 'fetchUsers').mockResolvedValue([mockUser])
    const store = useAuthStore()

    await store.login('Bret', '1-770-736-8031 x56442')
    store.clearSession()

    expect(store.currentUser).toBeNull()
    expect(sessionStorage.getItem(STORAGE_KEYS.CURRENT_USER)).toBeNull()
  })

  it('hydrates current user from session storage', () => {
    sessionStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(mockUser))

    const store = useAuthStore()

    expect(store.currentUser).toEqual(mockUser)
  })

  it('returns null for corrupt session storage', () => {
    sessionStorage.setItem(STORAGE_KEYS.CURRENT_USER, 'not-json')

    const store = useAuthStore()

    expect(store.currentUser).toBeNull()
  })
})
