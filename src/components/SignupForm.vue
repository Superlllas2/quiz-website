<script>
import apiClient from '../../src/api.js'

export default {
  data() {
    return {
      email: '',
      password: '',
      repeatPassword: '',
      termsAccepted: false,
      emailValid: true,
      passwordValid: true,
      passwordsSame: true,
    };
  },
  methods: {
    validateForm() {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      this.emailValid = emailPattern.test(this.email);
      this.passwordValid = this.password.length >= 6;
      this.passwordsSame = this.password === this.repeatPassword;

      if (!this.termsAccepted) {
        alert("You must accept the terms and conditions");
      }

      return this.emailValid && this.passwordValid && this.passwordsSame && this.termsAccepted;
    },
    async registerUser() {
      if (!this.validateForm()) {
        return;
      }

      try {
        const response = await apiClient.post('/auth/register', {
          email: this.email,
          password: this.password,
        });

        if (response.data.message === "User registered successfully") {
          alert("Registration successful!");
          this.$router.push('/login');
        }
      } catch (error) {
        console.error("Registration error:", error.response ? error.response.data.message : error.message);
        alert(error.response?.data?.message || "Registration failed");
      }
    }
  }
};
</script>

<template>
  <section class="auth-card">
    <form @submit.prevent="registerUser">
      <p class="eyebrow">Join the run</p>
      <h1>Create account</h1>
      <p class="subcopy">Spin up a custom quiz lobby in seconds.</p>

      <label class="input-field">
        <span>Email</span>
        <input type="email" required v-model="email" :class="{ 'error': !emailValid }" placeholder="you@example.com">
        <small v-if="!emailValid">Please enter a valid email.</small>
      </label>

      <div class="password-grid">
        <label class="input-field">
          <span>Password</span>
          <input type="password" required v-model="password" :class="{ 'error': !passwordValid }" placeholder="••••••••">
          <small v-if="!passwordValid">At least 6 characters.</small>
        </label>

        <label class="input-field">
          <span>Confirm password</span>
          <input type="password" required v-model="repeatPassword" :class="{ 'error': !passwordsSame }" placeholder="••••••••">
          <small v-if="!passwordsSame">Passwords must match.</small>
        </label>
      </div>

      <label class="terms">
        <input type="checkbox" v-model="termsAccepted" required>
        <span>I agree to the playful but serious terms.</span>
      </label>

      <button type="submit" class="primary">Sign Up</button>
      <p class="subtle">Already have an account? <router-link to="/login">Log in</router-link></p>
    </form>
  </section>
</template>

<style scoped>
.auth-card {
  width: min(480px, 100%);
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
}

.input-field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.input-field span {
  font-weight: 600;
}

.password-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
}

input[type="email"],
input[type="password"],
input[type="text"] {
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

.terms {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  font-size: 0.9rem;
  color: var(--text-muted);
}

button.primary {
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
