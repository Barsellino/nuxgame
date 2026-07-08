<script setup>
defineProps({
  todo: {
    type: Object,
    required: true,
  },
  isFavorite: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['toggle-favorite'])
</script>

<template>
  <li class="todo-item" :class="{ completed: todo.completed }">
    <div class="todo-main">
      <span class="todo-id">#{{ todo.id }}</span>
      <span class="todo-user">User {{ todo.userId }}</span>
      <p class="todo-title">{{ todo.title }}</p>
      <span class="todo-status">{{ todo.completed ? 'Completed' : 'Uncompleted' }}</span>
    </div>

    <button
      type="button"
      class="favorite-button"
      :class="{ active: isFavorite }"
      :aria-pressed="isFavorite"
      @click="emit('toggle-favorite', todo.id)"
    >
      {{ isFavorite ? '★' : '☆' }}
    </button>
  </li>
</template>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid var(--color-border-light);
  border-radius: 10px;
  background: var(--color-surface);
}

.todo-item.completed {
  background: var(--color-completed-bg);
}

.todo-main {
  display: grid;
  gap: 0.35rem;
  flex: 1;
}

.todo-id,
.todo-user {
  font-size: 0.8rem;
  color: var(--color-muted);
}

.todo-title {
  margin: 0;
  color: var(--color-text);
}

.todo-status {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-text-secondary);
}

.favorite-button {
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  background: var(--color-surface);
  font-size: 1.2rem;
  cursor: pointer;
}

.favorite-button.active {
  border-color: var(--color-favorite);
  color: var(--color-favorite);
}
</style>
