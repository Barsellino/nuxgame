<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import CreateTodoForm from '../components/CreateTodoForm.vue'
import TodoFilters from '../components/TodoFilters.vue'
import TodoList from '../components/TodoList.vue'
import UserProfile from '../components/UserProfile.vue'
import { useAuthStore } from '../stores/auth'
import { useFavoritesStore } from '../stores/favorites'
import { useTodosStore } from '../stores/todos'

const router = useRouter()
const authStore = useAuthStore()
const favoritesStore = useFavoritesStore()
const todosStore = useTodosStore()

const { currentUser } = storeToRefs(authStore)
const { statusFilter, userIdFilter, searchQuery, loading, error, uniqueUserIds, filteredTodos } =
  storeToRefs(todosStore)

onMounted(() => {
  todosStore.loadTodos()
})

function logout() {
  authStore.clearSession()
  router.push('/')
}

function handleAdd({ userId, title }) {
  return todosStore.addTodo(userId, title)
}
</script>

<template>
  <div v-if="currentUser" class="dashboard">
    <header class="dashboard-header">
      <h1>Dashboard</h1>
      <button type="button" class="logout-button" @click="logout">Logout</button>
    </header>

    <UserProfile :user="currentUser" />

    <div class="dashboard-grid">
      <aside class="sidebar">
        <TodoFilters
          v-model:status-filter="statusFilter"
          v-model:user-id-filter="userIdFilter"
          v-model:search-query="searchQuery"
          :user-ids="uniqueUserIds"
        />

        <CreateTodoForm :on-add="handleAdd" :default-user-id="currentUser.id" />
      </aside>

      <main class="content">
        <p v-if="loading" class="status">Loading todos...</p>
        <p v-else-if="error" class="status error">{{ error }}</p>
        <TodoList
          v-else
          :todos="filteredTodos"
          :is-favorite="favoritesStore.isFavorite"
          @toggle-favorite="favoritesStore.toggleFavorite"
        />
      </main>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem;
  background: var(--color-bg);
}

.dashboard-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

h1 {
  margin: 0;
  color: var(--color-text);
}

.logout-button {
  padding: 0.6rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-surface);
  cursor: pointer;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: minmax(260px, 320px) 1fr;
  gap: 1.5rem;
}

.sidebar,
.content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.status {
  margin: 0;
  color: var(--color-muted);
}

.status.error {
  color: var(--color-error);
}

@media (max-width: 900px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}
</style>
