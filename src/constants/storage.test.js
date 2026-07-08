import { describe, expect, it } from 'vitest'
import { STORAGE_KEYS } from './storage'

describe('storage constants', () => {
  it('exports storage keys', () => {
    expect(STORAGE_KEYS.CURRENT_USER).toBe('currentUser')
    expect(STORAGE_KEYS.FAVORITE_TODO_IDS_BY_USER).toBe('favoriteTodoIdsByUser')
  })
})
