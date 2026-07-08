import { describe, expect, it } from 'vitest'
import { STORAGE_KEYS } from '../constants/storage'
import { useAuthStore } from './auth'
import { useFavoritesStore } from './favorites'

function setUser(id) {
  useAuthStore().currentUser = { id }
}

describe('favorites store', () => {
  it('starts with empty favorites for user', () => {
    setUser(1)
    const { isFavorite } = useFavoritesStore()
    expect(isFavorite(1)).toBe(false)
  })

  it('toggles favorite on and off for a user', () => {
    setUser(1)
    const store = useFavoritesStore()

    store.toggleFavorite(1)
    expect(store.isFavorite(1)).toBe(true)

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEYS.FAVORITE_TODO_IDS_BY_USER))
    expect(stored['1']).toEqual([1])

    store.toggleFavorite(1)
    expect(store.isFavorite(1)).toBe(false)
    expect(JSON.parse(localStorage.getItem(STORAGE_KEYS.FAVORITE_TODO_IDS_BY_USER))['1']).toEqual(
      [],
    )
  })

  it('keeps favorites isolated per user', () => {
    const store = useFavoritesStore()

    setUser(1)
    store.toggleFavorite(10)

    setUser(2)
    store.toggleFavorite(20)

    expect(store.isFavorite(20)).toBe(true)
    expect(store.isFavorite(10)).toBe(false)

    setUser(1)
    expect(store.isFavorite(10)).toBe(true)
    expect(store.isFavorite(20)).toBe(false)

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEYS.FAVORITE_TODO_IDS_BY_USER))
    expect(stored['1']).toEqual([10])
    expect(stored['2']).toEqual([20])
  })

  it('loads favorites from localStorage for a user', () => {
    localStorage.setItem(STORAGE_KEYS.FAVORITE_TODO_IDS_BY_USER, JSON.stringify({ 2: [2, 3] }))
    setUser(2)

    const { isFavorite } = useFavoritesStore()
    expect(isFavorite(2)).toBe(true)
    expect(isFavorite(3)).toBe(true)
  })

  it('falls back to empty set for corrupt localStorage', () => {
    localStorage.setItem(STORAGE_KEYS.FAVORITE_TODO_IDS_BY_USER, 'not-json')
    setUser(1)

    const { isFavorite } = useFavoritesStore()
    expect(isFavorite(1)).toBe(false)
  })
})
