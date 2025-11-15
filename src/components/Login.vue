<script>
import apiClient from '../../src/api.js'

export default {
  data() {
    return {
      email: '',
      password: '',
      emailValid: true,
      passwordValid: true,
    };
  },
  methods: {
    async checkLogin() {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      this.emailValid = emailPattern.test(this.email);
      this.passwordValid = this.password.length >= 6;

      if (this.emailValid && this.passwordValid) {
        await this.loginUser();
      }
    },
    async loginUser() {
      try {
        const response = await apiClient.post('/auth/login', {
          email: this.email,
          password: this.password,
        });

        localStorage.setItem('token', response.data.token);

        if (response.data.message === "Logged in successfully") {
          this.$router.push('/create');
        }
      } catch (error) {
        console.error(error.response ? error.response.data.message : error.message);
        alert(error.response?.data.message || "Login failed");
      }
    }
  }
};
</script>

<template>
  <section class="auth-card">
    <form @submit.prevent="checkLogin">
      <p class="eyebrow">Welcome back</p>
      <h1>Log in</h1>
      <p class="subcopy">Access your saved streaks and keep the momentum going.</p>

      <label class="input-field">
        <span>Email</span>
        <input type="email" required v-model="email" :class="{ 'error': !emailValid }" placeholder="you@example.com">
        <small v-if="!emailValid">Please enter a valid email address.</small>
      </label>

      <label class="input-field">
        <span>Password</span>
        <input type="password" required v-model="password" :class="{ 'error': !passwordValid }" placeholder="••••••••">
        <small v-if="!passwordValid">Minimum 6 characters.</small>
      </label>

      <button type="submit" class="primary">Log In</button>
      <p class="subtle">Don’t have an account? <router-link to="/signup">Create one</router-link></p>
    </form>
  </section>
</template>

<style scoped>
.auth-card {
  width: min(420px, 100%);
  margin: 0 auto;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.eyebrow {
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.3em;
  color: var(--accent);
}

h1 {
  margin: 0;
  font-size: 2rem;
}

.subcopy {
  color: var(--text-muted);
  margin-bottom: 0.5rem;
}

.input-field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.input-field span {
  font-weight: 600;
}

input {
  width: 100%;
  padding: 0.85rem 1rem;
  border-radius: 14px;
  border: 1px solid var(--panel-border);
  background: rgba(255, 255, 255, 0.04);
  color: var(--text-primary);
}

input:focus {
  outline: 2px solid var(--accent);
}

.error {
  border-color: var(--error);
}

small {
  color: var(--error);
}

button.primary {
  margin-top: 0.5rem;
  width: 100%;
  border: none;
  border-radius: 16px;
  padding: 0.9rem 1rem;
  font-weight: 600;
  background: linear-gradient(120deg, var(--accent), var(--accent-2));
  color: #05060f;
  box-shadow: 0 12px 20px rgba(12, 200, 255, 0.25);
}

.subtle {
  text-align: center;
  color: var(--text-muted);
}

.subtle a {
  color: var(--accent);
  text-decoration: none;
}
</style>
