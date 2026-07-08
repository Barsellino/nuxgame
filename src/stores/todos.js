import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { createTodo, fetchTodos } from '../api/jsonplaceholder'
import { TODO_ERRORS } from '../constants/messages'
import { STORAGE_KEYS } from '../constants/storage'
import { filterTodos, getUniqueUserIds } from '../utils/todoFilters'
import { useAuthStore } from './auth'
import { useFavoritesStore } from './favorites'

const API_ID_CEILING = 200

function loadCreatedByUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CREATED_TODOS_BY_USER)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export const useTodosStore = defineStore('todos', () => {
  const auth = useAuthStore()
  const favorites = useFavoritesStore()

  const todos = ref([])
  const createdByUser = ref(loadCreatedByUser())
  const statusFilter = ref('all')
  const userIdFilter = ref('all')
  const searchQuery = ref('')
  const loading = ref(false)
  const error = ref('')

  const userKey = computed(() => String(auth.currentUser?.id))
  const createdTodos = computed(() => createdByUser.value[userKey.value] ?? [])

  const uniqueUserIds = computed(() => getUniqueUserIds(todos.value))

  const filteredTodos = computed(() =>
    filterTodos(
      todos.value,
      {
        status: statusFilter.value,
        userId: userIdFilter.value,
        search: searchQuery.value,
      },
      favorites.isFavorite,
    ),
  )

  function persistCreated() {
    localStorage.setItem(STORAGE_KEYS.CREATED_TODOS_BY_USER, JSON.stringify(createdByUser.value))
  }

  function nextId() {
    return todos.value.reduce((max, todo) => Math.max(max, todo.id), API_ID_CEILING) + 1
  }

  async function loadTodos() {
    loading.value = true
    error.value = ''

    try {
      const fetched = await fetchTodos()
      todos.value = [...createdTodos.value, ...fetched]
    } catch {
      error.value = TODO_ERRORS.LOAD_FAILED
    } finally {
      loading.value = false
    }
  }

  async function addTodo(userIdValue, title) {
    const created = await createTodo({
      userId: Number(userIdValue),
      title,
      completed: false,
    })

    const newTodo = {
      ...created,
      id: nextId(),
      userId: Number(userIdValue),
      title,
      completed: false,
    }

    todos.value = [newTodo, ...todos.value]
    createdByUser.value = {
      ...createdByUser.value,
      [userKey.value]: [newTodo, ...createdTodos.value],
    }
    persistCreated()

    return newTodo
  }

  return {
    todos,
    statusFilter,
    userIdFilter,
    searchQuery,
    loading,
    error,
    uniqueUserIds,
    filteredTodos,
    loadTodos,
    addTodo,
  }
})
