import { describe, expect, it } from 'vitest'
import { filterUsernameInput, filterPhoneInput } from './validation'

describe('filterUsernameInput', () => {
  it('keeps letters and the dot/underscore separators', () => {
    expect(filterUsernameInput('Elwyn.Skiles')).toBe('Elwyn.Skiles')
    expect(filterUsernameInput('Leopoldo_Corkery')).toBe('Leopoldo_Corkery')
  })

  it('removes digits, spaces and other symbols', () => {
    expect(filterUsernameInput('abc123 !@#')).toBe('abc')
    expect(filterUsernameInput('Ervin Howell')).toBe('ErvinHowell')
  })

  it('returns empty string for empty input', () => {
    expect(filterUsernameInput('')).toBe('')
  })
})

describe('filterPhoneInput', () => {
  it('keeps digits, symbols and the extension marker x', () => {
    expect(filterPhoneInput('1-770-736-8031 x56442')).toBe('1-770-736-8031 x56442')
  })

  it('removes letters other than x', () => {
    expect(filterPhoneInput('12ab34X')).toBe('1234X')
  })

  it('removes all non-x letters', () => {
    expect(filterPhoneInput('abcABC')).toBe('')
  })

  it('returns empty string for empty input', () => {
    expect(filterPhoneInput('')).toBe('')
  })
})
