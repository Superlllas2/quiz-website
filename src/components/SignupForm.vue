<script>
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

      if (this.password === this.repeatPassword && this.password.length !== 0 && this.password.length >= 6) {
        this.passwordsSame = true;
        console.log("Passwords same")
      } else {
        console.log("Passwords NOT same")
        this.passwordsSame = false;
      }

      if (this.passwordsSame && this.emailValid) {
        console.log("Form is valid");
        this.$router.push('/signup');
      } else {
        console.log("Form is not valid");
      }
    }
  }
}
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


    <div class="terms">
      <input type="checkbox" v-model="terms" required>
      <label> accept terms and conditions</label>
    </div>


    <button type="submit">Play</button>
  </form>
</template>

<style>
.error {
  border: 2px solid red;
  border-radius: 0.2rem;
}

.signUp {
  text-align: center;
  font-size: 2rem;
}

.field label {
  font-size: 1.2rem;
}

form {
  display: flex;
  flex-direction: column;
}

.field {
  margin-bottom: 15px; /* Add some space between fields */
}

label {
  display: block; /* Ensure label is a block element, so it takes up full width */
  margin-bottom: 5px; /* Add space between the label and the input field */
}

input[type="email"],
input[type="password"] {
  width: 100%; /* Make input fields take up full width */
  padding: 10px;
  box-sizing: border-box; /* Make sure padding doesn’t cause overflow */
}

.terms {
  display: flex;
  align-items: center;

  input {
    margin-left: 10%;
  }

  label {
    margin: 0 auto;
  }
}

button {
  margin-top: 20%;
  padding: 5% 0;
  font-size: 1rem;
}
</style>