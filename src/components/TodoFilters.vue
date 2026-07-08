<script setup>
defineProps({
  statusFilter: {
    type: String,
    required: true,
  },
  userIdFilter: {
    type: [String, Number],
    required: true,
  },
  searchQuery: {
    type: String,
    required: true,
  },
  userIds: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['update:statusFilter', 'update:userIdFilter', 'update:searchQuery'])
</script>

<template>
  <section class="filters">
    <label class="filter-field">
      <span>Status</span>
      <select :value="statusFilter" @change="emit('update:statusFilter', $event.target.value)">
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="uncompleted">Uncompleted</option>
        <option value="favorites">Favorites</option>
      </select>
    </label>

    <label class="filter-field">
      <span>User ID</span>
      <select :value="userIdFilter" @change="emit('update:userIdFilter', $event.target.value)">
        <option value="all">All Users</option>
        <option v-for="id in userIds" :key="id" :value="String(id)">
          {{ id }}
        </option>
      </select>
    </label>

    <label class="filter-field search-field">
      <span>Search by title</span>
      <input
        :value="searchQuery"
        type="search"
        placeholder="Search todos..."
        @input="emit('update:searchQuery', $event.target.value)"
      />
    </label>
  </section>
</template>

<style scoped>
.filters {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  padding: 1rem;
  border-radius: 12px;
  background: var(--color-surface-muted);
}

.filter-field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-size: 0.9rem;
  color: var(--color-text-secondary);
}

.filter-field select,
.filter-field input {
  padding: 0.65rem 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  font-size: 0.95rem;
}

.search-field {
  grid-column: 1 / -1;
}
</style>
