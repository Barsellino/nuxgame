import { describe, expect, it } from 'vitest'
import { LOGIN_ERRORS } from './auth'

describe('auth constants', () => {
  it('exports login error messages', () => {
    expect(LOGIN_ERRORS.REQUIRED).toBe('Username and phone are required')
    expect(LOGIN_ERRORS.INVALID).toBe('Invalid username or phone number')
    expect(LOGIN_ERRORS.NETWORK).toBe('Unable to connect. Please try again.')
  })
})
