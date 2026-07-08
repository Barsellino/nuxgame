import { describe, expect, it } from 'vitest'
import { TODO_ERRORS } from './messages'

describe('messages constants', () => {
  it('exports todo error messages', () => {
    expect(TODO_ERRORS.LOAD_FAILED).toBe('Failed to load todos')
    expect(TODO_ERRORS.CREATE_FAILED).toBe('Failed to create todo')
    expect(TODO_ERRORS.FIELDS_REQUIRED).toBe('User ID and Title are required')
  })
})
