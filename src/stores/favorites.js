import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { STORAGE_KEYS } from '../constants/storage'
import { useAuthStore } from './auth'

function loadFavoritesByUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.FAVORITE_TODO_IDS_BY_USER)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export const useFavoritesStore = defineStore('favorites', () => {
  const auth = useAuthStore()
  const favoritesByUser = ref(loadFavoritesByUser())

  const userKey = computed(() => String(auth.currentUser?.id))
  const favoriteIds = computed(() => new Set(favoritesByUser.value[userKey.value] ?? []))

  function persist() {
    localStorage.setItem(
      STORAGE_KEYS.FAVORITE_TODO_IDS_BY_USER,
      JSON.stringify(favoritesByUser.value),
    )
  }

  function isFavorite(id) {
    return favoriteIds.value.has(id)
  }

  function toggleFavorite(id) {
    const next = new Set(favoriteIds.value)

    if (next.has(id)) {
      next.delete(id)
    } else {
      next.add(id)
    }

    favoritesByUser.value = { ...favoritesByUser.value, [userKey.value]: [...next] }
    persist()
  }

  return { favoriteIds, isFavorite, toggleFavorite }
})
