<script>
export default {
  name: 'SiteHeader'
}
</script>

<template>
  <header class="site-header">
    <div class="brand-block">
      <router-link to="/" class="logo">QuizCraft</router-link>
      <p class="tagline">AI-powered trivia sprints</p>
    </div>

    <nav class="main-nav" aria-label="Primary">
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/login" class="nav-link">Login</router-link>
      <router-link to="/signup" class="nav-link">Sign up</router-link>
    </nav>

    <router-link to="/create" class="cta">Start playing</router-link>
  </header>
</template>

<style scoped>
.site-header {
  width: min(1100px, 100%);
  margin: 0 auto;
  padding: clamp(1.5rem, 3vw, 2.5rem) 1.5rem 0;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
}

.brand-block {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.logo {
  font-weight: 700;
  font-size: clamp(1.5rem, 2vw, 2rem);
  color: var(--text-primary);
  text-decoration: none;
}

.tagline {
  color: var(--text-muted);
  font-size: 0.95rem;
  margin: 0;
}

.main-nav {
  display: flex;
  gap: 1rem;
}

.nav-link {
  color: var(--text-muted);
  text-decoration: none;
  font-weight: 500;
  padding: 0.35rem 0.65rem;
  border-radius: 999px;
  transition: color 0.2s ease, background 0.2s ease;
}

.nav-link.router-link-active,
.nav-link:hover {
  color: var(--text-primary);
  background: rgba(255, 255, 255, 0.08);
}

.cta {
  padding: 0.75rem 1.4rem;
  border-radius: 999px;
  background: linear-gradient(120deg, var(--accent), var(--accent-2));
  color: #0c1022;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 8px 25px rgba(18, 199, 255, 0.35);
}

@media (max-width: 720px) {
  .site-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .main-nav {
    width: 100%;
    justify-content: space-between;
  }
}
</style>
