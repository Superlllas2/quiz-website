<script>
export default {
  name: 'SiteFooter'
}
</script>

<template>
  <footer class="site-footer">
    <div class="footer-meta">
      <p class="brand">© {{ new Date().getFullYear() }} QuizCraft</p>
      <p class="subtle">Built by <a href="https://nevrov.org/" target="_blank" rel="noopener">Ilia Nevrov</a></p>
    </div>
    <div class="footer-links">
      <router-link to="/create">Play</router-link>
      <router-link to="/login">Login</router-link>
      <router-link to="/signup">Sign up</router-link>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  width: min(1100px, 100%);
  margin: 0 auto;
  padding: 2rem 1.5rem 3rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--text-muted);
}

.footer-meta {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.brand {
  margin: 0;
  font-weight: 600;
  color: var(--text-primary);
}

.subtle {
  margin: 0;
}

.subtle a {
  color: var(--accent);
  text-decoration: none;
}

.footer-links {
  display: flex;
  gap: 1rem;
}

.footer-links a {
  color: var(--text-muted);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-links a:hover {
  color: var(--text-primary);
}

@media (max-width: 640px) {
  .site-footer {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
</style>
