<script>
export default {
  name: 'Body'
}
</script>

<template>
  <main class="app-shell">
    <section class="body">
      <slot></slot>
    </section>
  </main>
</template>

<style scoped>
.app-shell {
  width: 100%;
  min-height: calc(100vh - 220px);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: clamp(1rem, 3vw, 4rem) 1.5rem;
}

.body {
  width: min(960px, 100%);
  background: var(--panel-surface);
  border-radius: 32px;
  padding: clamp(1.5rem, 4vw, 3.25rem);
  box-shadow: 0 25px 60px rgba(10, 12, 28, 0.45);
  border: 1px solid var(--panel-border);
}

@media (max-width: 640px) {
  .body {
    border-radius: 24px;
    padding: 1.5rem;
  }
}
</style>
