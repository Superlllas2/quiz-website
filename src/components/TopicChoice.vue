<script>
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
  methods: {
    checkFields() {
      this.topic1Valid = this.topic1.trim() !== ''; // Field is valid if not empty
      this.topic2Valid = this.topic2.trim() !== '';
      this.topic3Valid = this.topic3.trim() !== '';

      // Prevent form submission if any field is invalid
      if (this.topic1Valid && this.topic2Valid && this.topic3Valid) {
        this.navigateToGame();
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
    }
  }
}
</script>

<template>
  <form>
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
      <select v-model="selectedOption" id="dropdown">
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