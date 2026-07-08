<script setup>
import { onMounted, ref, watch } from 'vue'
import { TODO_ERRORS } from '../constants/messages'

const props = defineProps({
  onAdd: {
    type: Function,
    required: true,
  },
  defaultUserId: {
    type: [Number, String],
    default: '',
  },
})

const userId = ref('')
const title = ref('')
const submitting = ref(false)
const error = ref('')

function applyDefaultUserId() {
  if (props.defaultUserId !== '' && props.defaultUserId != null) {
    userId.value = String(props.defaultUserId)
  }
}

onMounted(applyDefaultUserId)

watch(
  () => props.defaultUserId,
  () => {
    applyDefaultUserId()
  },
)

async function onSubmit() {
  error.value = ''

  if (!userId.value || !title.value.trim()) {
    error.value = TODO_ERRORS.FIELDS_REQUIRED
    return
  }

  submitting.value = true

  try {
    await props.onAdd({
      userId: userId.value,
      title: title.value.trim(),
    })
    userId.value = props.defaultUserId !== '' ? String(props.defaultUserId) : ''
    title.value = ''
  } catch {
    error.value = TODO_ERRORS.CREATE_FAILED
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <section class="create-todo">
    <h2>Create todo</h2>

    <form class="create-form" @submit.prevent="onSubmit">
      <label class="field">
        <span>User ID</span>
        <input v-model="userId" type="number" min="1" placeholder="User ID" />
      </label>

      <label class="field">
        <span>Title</span>
        <input v-model="title" type="text" placeholder="Todo title" />
      </label>

      <button type="submit" class="add-button" :disabled="submitting">
        {{ submitting ? 'Adding...' : 'Add' }}
      </button>
    </form>

    <p v-if="error" class="error" role="alert">{{ error }}</p>
  </section>
</template>

<style scoped>
.create-todo {
  padding: 1rem;
  border-radius: 12px;
  background: var(--color-surface);
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
}

h2 {
  margin: 0 0 1rem;
  color: var(--color-text);
}

.create-form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
  align-items: end;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  color: var(--color-text-secondary);
}

.field input {
  padding: 0.65rem 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
}

.add-button {
  padding: 0.7rem 1rem;
  border: none;
  border-radius: 8px;
  background: #16a34a;
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;
}

.add-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error {
  margin: 0.75rem 0 0;
  color: var(--color-error);
}
</style>
