<script setup>
defineProps({
  user: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <section class="profile">
    <h2>Profile</h2>
    <dl class="profile-grid">
      <div>
        <dt>Name</dt>
        <dd>{{ user.name }}</dd>
      </div>
      <div>
        <dt>Username</dt>
        <dd>{{ user.username }}</dd>
      </div>
      <div>
        <dt>Email</dt>
        <dd>{{ user.email }}</dd>
      </div>
      <div>
        <dt>Phone</dt>
        <dd>{{ user.phone }}</dd>
      </div>
      <div>
        <dt>Street</dt>
        <dd>{{ user.address.street }}</dd>
      </div>
      <div>
        <dt>City</dt>
        <dd>{{ user.address.city }}</dd>
      </div>
      <div>
        <dt>Company</dt>
        <dd>{{ user.company.name }}</dd>
      </div>
    </dl>
  </section>
</template>

<style scoped>
.profile {
  padding: 1.5rem;
  border-radius: 12px;
  background: var(--color-surface);
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
}

h2 {
  margin: 0 0 1rem;
  color: var(--color-text);
}

.profile-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  margin: 0;
}

dt {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-muted);
}

dd {
  margin: 0.25rem 0 0;
  font-weight: 600;
  color: var(--color-text-emphasis);
}
</style>
