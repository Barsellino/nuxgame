import { describe, expect, it } from 'vitest'
import { STORAGE_KEYS } from '../constants/storage'
import { mockUser } from '../test/fixtures'
import { requireAuth } from './guards'

describe('requireAuth', () => {
  it('allows navigation when user is stored', () => {
    sessionStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(mockUser))

    expect(requireAuth()).toBe(true)
  })

  it('redirects to login when user is missing', () => {
    expect(requireAuth()).toBe('/')
  })
})
