import { describe, expect, it } from 'vitest'
import { normalizePhone } from './phone'

describe('normalizePhone', () => {
  it('strips symbols and drops the extension', () => {
    expect(normalizePhone('1-770-736-8031 x56442')).toBe('17707368031')
  })

  it('matches user phone against input without extension', () => {
    expect(normalizePhone('1-770-736-8031 x56442')).toBe(normalizePhone('1-770-736-8031'))
  })

  it('handles numeric input', () => {
    expect(normalizePhone(123456)).toBe('123456')
  })

  it('is case insensitive for the extension marker', () => {
    expect(normalizePhone('1-770-736-8031 X56442')).toBe('17707368031')
  })
})
