<script>
import apiClient from '../../src/api.js'

export default {
  data() {
    return {
      topic1: '',
      topic2: '',
      topic3: '',
      topic1Valid: true,
      topic2Valid: true,
      topic3Valid: true,
      selectedOption: '', // Selected value from the dropdown
      options: ['Friendly', 'Easy', 'Intermediate', 'Hard', 'Immortal'] // Dropdown options
    }
  },
  mounted() {
    this.fetchProtectedData();
  },
  methods: {
    checkFields() {
      this.topic1Valid = this.topic1.trim() !== ''; // Field is valid if not empty
      this.topic2Valid = this.topic2.trim() !== '';
      this.topic3Valid = this.topic3.trim() !== '';
      const allValid = this.topic1Valid && this.topic2Valid && this.topic3Valid && this.selectedOption;

      if (allValid) {
        this.navigateToGame();
      } else {
        alert("Please fill in all topics and select a difficulty level.");
      }
    },
    navigateToGame() {
      // Pass topics and difficulty as route query parameters
      this.$router.push({
        path: '/game',
        query: {
          topic1: this.topic1,
          topic2: this.topic2,
          topic3: this.topic3,
          difficulty: this.selectedOption
        }
      });
    },
    async fetchProtectedData() {
      try {
        // Set up headers conditionally based on environment
        const headers = {};

        if (import.meta.env.MODE === 'production') {
          const token = localStorage.getItem('token');
          headers.Authorization = `Bearer ${token}`;
        }

        const response = await apiClient.get('/protected/create', { headers });
        console.log('Protected data:', response.data);
      } catch (error) {
        console.error('Failed to fetch protected data:', error);
      }
    }

  }
}
</script>

<template>
  <form @submit.prevent="checkFields">
    <h1 class="signUp">Choose topic</h1>
    <div class="field">
      <label>Topic 1</label>
      <input v-model="topic1" placeholder="For example: best fps games of 2010s" required
             :class="{ 'error': !topic1Valid }"/>
    </div>
    <div class="field">
      <label>Topic 2</label>
      <input v-model="topic2" placeholder="For example: anime from 2000s" required :class="{ 'error': !topic2Valid }"/>
    </div>
    <div class="field">
      <label>Topic 3</label>
      <input v-model="topic3" placeholder="For example: rap artist's life of 90s" required
             :class="{ 'error': !topic3Valid }"/>
    </div>
    <div class="field">
      <label for="dropdown">Difficulty:</label>
      <select v-model="selectedOption" id="dropdown" required>
        <option disabled value="">Select Difficulty</option>
        <option v-for="(option, index) in options" :key="index" :value="option">
          {{ option }}
        </option>
      </select>
    </div>
    <button @click="checkFields" type="submit">Play</button>
  </form>
</template>

<style>
.field input, select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>