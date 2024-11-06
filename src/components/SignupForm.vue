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
        return; // If form validation fails, exit
      }

      try {
        // body
        // {
        //   email: this.email,
        //       password: this.password,
        // }
        const response = await apiClient.get('/testLucas');

        if (response.data.message === "User registered successfully") {
          alert("Registration successful!");
          this.$router.push('/login'); // Redirect to '/login' after registration
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
  <form @submit.prevent="registerUser"> <!-- Call registerUser directly -->
    <h1 class="signUp">Sign up</h1>
    <div class="field">
      <label>Email:</label>
      <input type="email" required v-model="email" :class="{ 'error': !emailValid }">
    </div>
    <div class="field">
      <label>Password:</label>
      <input type="password" required v-model="password" :class="{ 'error': !passwordValid }">
    </div>
    <div class="field">
      <label>Confirm password:</label>
      <input type="password" required v-model="repeatPassword" :class="{ 'error': !passwordsSame }">
    </div>
    <div class="signIn">
      <p>Already have an account? <router-link to="/login" class="logIn-link">Log-in</router-link></p>
    </div>
    <div class="terms">
      <input type="checkbox" v-model="termsAccepted" required>
      <label>Accept terms and conditions</label>
    </div>
    <button type="submit">Sign Up</button>
  </form>
</template>

<style>
form {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px; /* Optional: Set max width for better readability */
  margin: auto;
  padding: 20px;
  min-height: 600px;
}

.error {
  border: 2px solid red;
  border-radius: 0.2rem;
}

h1.signUp {
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

.field:nth-child(4) {
  margin-bottom: 1rem;
}

.logIn-link {
  color: #3498db;
}

.logIn-link:hover {
  color: #2980b9;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.signIn {
  text-align: center;
  margin-bottom: 1rem;

  p {
    margin: 0;
  }
}

.terms {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
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