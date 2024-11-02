<script>
import axios from "axios";

export default {
  data() {
    return {
      email: '',
      password: '',
      repeatPassword: '',
      terms: 'false',
      passwordsSame: 'false',
      emailValid: true,
      passwordValid: true,
    }
  },
  methods: {
    checkPassword() {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      this.emailValid = emailPattern.test(this.email);

      if (this.password === this.repeatPassword && this.password.length >= 6) {
        this.passwordsSame = true;
        console.log("Passwords match");
      } else {
        console.log("Passwords do not match");
        this.passwordsSame = false;
      }

      if (this.passwordsSame && this.emailValid) {
        console.log("Form is valid");
        this.navigateToGame();
      } else {
        console.log("Form is not valid");
      }
    },
    navigateToGame() {
      this.$router.push('/create');
    },
    async registerUser() {
      try {
        const response = await axios.post('http://localhost:5001/api/users/register', {
          email: this.email,
          password: this.password,
        });

        if (response.data.message === "User registered successfully") {
          this.$router.push('/create'); // Redirect to '/create'
        }
      } catch (error) {
        console.error(error.response ? error.response.data.message : error.message);
        alert(error.response.data.message || "Registration failed");
      }
    }
  }
};
</script>

<template>
  <form @submit.prevent="checkPassword">
    <h1 class="signUp">Sign up</h1>
    <div class="field">
      <label>Email:</label>
      <input type="email" required v-model="email" :class="{ 'error': !emailValid }">
    </div>
    <div class="field">
      <label>Password:</label>
      <input type="password" required v-model="password" :class="{ 'error': !passwordsSame }">
    </div>
    <div class="field">
      <label>Confirm password:</label>
      <input type="password" required v-model="repeatPassword" :class="{ 'error': !passwordsSame }">
    </div>
    <div class="signIn">
      <p>Already have an account? <router-link to="/login" class="logIn-link">Log-in</router-link></p>
    </div>
    <div class="terms">
      <input type="checkbox" v-model="terms" required>
      <label> accept terms and conditions</label>
    </div>
    <button type="submit">Play</button>
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