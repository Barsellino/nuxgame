import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it, vi } from 'vitest'
import * as api from '../api/jsonplaceholder'
import { TODO_ERRORS } from '../constants/messages'
import { STORAGE_KEYS } from '../constants/storage'
import { mockTodos } from '../test/fixtures'
import { useAuthStore } from './auth'
import { useFavoritesStore } from './favorites'
import { useTodosStore } from './todos'

function setUser(id) {
  useAuthStore().currentUser = { id }
}

describe('todos store', () => {
  it('loads todos successfully', async () => {
    vi.spyOn(api, 'fetchTodos').mockResolvedValue(mockTodos)
    const store = useTodosStore()

    await store.loadTodos()

    expect(store.todos).toEqual(mockTodos)
    expect(store.loading).toBe(false)
    expect(store.error).toBe('')
  })

  it('falls back to empty created todos for corrupt localStorage', async () => {
    localStorage.setItem(STORAGE_KEYS.CREATED_TODOS_BY_USER, 'not-json')
    vi.spyOn(api, 'fetchTodos').mockResolvedValue(mockTodos)
    const store = useTodosStore()

    await store.loadTodos()

    expect(store.todos).toEqual(mockTodos)
  })

  it('sets error when loading fails', async () => {
    vi.spyOn(api, 'fetchTodos').mockRejectedValue(new Error('fail'))
    const store = useTodosStore()

    await store.loadTodos()

    expect(store.error).toBe(TODO_ERRORS.LOAD_FAILED)
    expect(store.loading).toBe(false)
  })

  it('adds todo to list', async () => {
    const created = { id: 201, userId: 1, title: 'New todo', completed: false }
    vi.spyOn(api, 'createTodo').mockResolvedValue(created)
    const store = useTodosStore()

    await store.addTodo('1', 'New todo')

    expect(store.todos).toContainEqual(created)
  })

  it('assigns unique ids to created todos regardless of API response', async () => {
    vi.spyOn(api, 'fetchTodos').mockResolvedValue(mockTodos)
    vi.spyOn(api, 'createTodo').mockResolvedValue({
      id: 201,
      userId: 1,
      title: 'stub',
      completed: false,
    })
    setUser(1)
    const store = useTodosStore()

    await store.loadTodos()
    const first = await store.addTodo('1', 'First')
    const second = await store.addTodo('1', 'Second')

    expect(first.id).not.toBe(second.id)
    const ids = store.todos.map((todo) => todo.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('computes filtered todos and unique user ids', async () => {
    vi.spyOn(api, 'fetchTodos').mockResolvedValue(mockTodos)
    setUser(1)
    useFavoritesStore().toggleFavorite(1)
    const store = useTodosStore()

    await store.loadTodos()

    expect(store.uniqueUserIds).toEqual([1, 2])
    expect(store.filteredTodos).toEqual(mockTodos)

    store.statusFilter = 'completed'
    expect(store.filteredTodos).toEqual([mockTodos[1]])

    store.userIdFilter = '2'
    store.statusFilter = 'all'
    expect(store.filteredTodos).toEqual([mockTodos[2]])

    store.searchQuery = 'delectus'
    store.userIdFilter = 'all'
    expect(store.filteredTodos).toEqual([mockTodos[0]])

    store.statusFilter = 'favorites'
    store.searchQuery = ''
    expect(store.filteredTodos).toEqual([mockTodos[0]])
  })

  it('persists created todos and restores them on next load', async () => {
    vi.spyOn(api, 'fetchTodos').mockResolvedValue(mockTodos)
    vi.spyOn(api, 'createTodo').mockResolvedValue({
      id: 201,
      userId: 7,
      title: 'Persisted',
      completed: false,
    })

    setUser(7)
    const first = useTodosStore()
    await first.loadTodos()
    await first.addTodo('7', 'Persisted')

    setActivePinia(createPinia())
    setUser(7)
    const second = useTodosStore()
    await second.loadTodos()

    expect(second.todos.some((todo) => todo.title === 'Persisted')).toBe(true)
  })
})
