<script setup>
import TodoItem from './TodoItem.vue'

defineProps({
  todos: {
    type: Array,
    required: true,
  },
  isFavorite: {
    type: Function,
    required: true,
  },
})

const emit = defineEmits(['toggle-favorite'])
</script>

<template>
  <section class="todo-list-section">
    <h2>Todo List</h2>
    <p class="count">{{ todos.length }} items shown</p>

    <ul v-if="todos.length" class="todo-list">
      <TodoItem
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        :is-favorite="isFavorite(todo.id)"
        @toggle-favorite="emit('toggle-favorite', $event)"
      />
    </ul>

    <p v-else class="empty">No todos match the current filters.</p>
  </section>
</template>

<style scoped>
.todo-list-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

h2 {
  margin: 0;
  color: var(--color-text);
}

.count,
.empty {
  margin: 0;
  color: var(--color-muted);
}

.todo-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-height: 60vh;
  overflow-y: auto;
}
</style>
