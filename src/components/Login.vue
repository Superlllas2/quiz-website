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
      // Validate email format
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      this.emailValid = emailPattern.test(this.email);

      // Validate password length
      this.passwordValid = this.password.length >= 6;

      // If valid, attempt to log in
      if (this.emailValid && this.passwordValid) {
        await this.loginUser();
      } else {
        console.log("Form is not valid");
      }
    },
    async loginUser() {
      try {
        const response = await apiClient.post('/api/auth/login', {
          email: this.email,
          password: this.password,
        });


        // Save token to localStorage
        localStorage.setItem('token', response.data.token);

        if (response.data.message === "Logged in successfully") {
          this.$router.push('/create'); // Redirect to '/create' after login
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
  <form @submit.prevent="checkLogin">
    <h1 class="login">Log In</h1>
    <div class="field">
      <label>Email:</label>
      <input type="email" required v-model="email" :class="{ 'error': !emailValid }">
    </div>
    <div class="field">
      <label>Password:</label>
      <input type="password" required v-model="password" :class="{ 'error': !passwordValid }">
    </div>
    <div class="signUp">
      <p>Don't have an account? <router-link to="/signup" class="signUp-link">Sign up</router-link></p>
    </div>
    <button type="submit">Log In</button>
  </form>
</template>

<style>
form {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  margin: auto;
  padding: 20px;
  min-height: 400px;
}

.error {
  border: 2px solid red;
  border-radius: 0.2rem;
}

h1.login {
  text-align: center;
  font-size: 2rem;
  margin-top: 40px;
}

.field label {
  font-size: 1.2rem;
}

.field {
  margin-bottom: 20px;
}

.field:nth-child(3) {
  margin-bottom: 1rem;
}

.signUp {
  text-align: center;
  margin-bottom: 1rem;

  p {
    margin: 0;
  }
}

.signUp-link {
  color: #3498db;
}

.signUp-link:hover {
  color: #2980b9;
}

input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  background-color: #3498db;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #2980b9;
}
</style>
