<template>
  <div class="wrapper">
    <div class="header">
      <span class="title">Question {{ currentQuestionNumber }}</span>
      <span class="score">Score: {{ totalScore }}</span>
    </div>

    <!-- Question Text -->
    <div class="question">
      <h2>{{ currentQuestion.text }}</h2>
    </div>

    <!-- Answer Options -->
    <div class="answers">
      <button v-for="(answer, index) in currentQuestion.answers" :key="index" @click="selectAnswer(index)">
        {{ answer }}
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      currentQuestionNumber: 1,
      totalScore: 0,
      timeLeft: 100000,
      timer: null,
      selectedTopic: 'science', // Example topic, modify as needed
      currentQuestion: {
        text: '',
        answers: [],
        correctAnswerIndex: null
      }
    };
  },
  methods: {
    async fetchQuestionFromBackend() {
      try {
        const response = await axios.post('http://localhost:5001/api/questions', {
          topic: this.selectedTopic // Send the selected topic to the backend
        });
        const generatedQuestion = response.data;

        // Update the current question with the data received from the backend
        this.currentQuestion = {
          text: generatedQuestion.question,
          answers: generatedQuestion.options,
          correctAnswerIndex: generatedQuestion.correctAnswerIndex
        };
      } catch (error) {
        console.error("Failed to fetch question from backend:", error);
      }
    },
    startTimer() {
      this.timeLeft = 10;
      this.timer = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          this.timeExpired();
        }
      }, 1000);
    },
    timeExpired() {
      clearInterval(this.timer);
      this.nextQuestion();
    },
    selectAnswer(index) {
      if (index === this.currentQuestion.correctAnswerIndex) {
        this.totalScore += 10;
      }
      this.nextQuestion();
    },
    async nextQuestion() {
      clearInterval(this.timer);
      this.currentQuestionNumber++;
      await this.fetchQuestionFromBackend(); // Fetch a new question from backend
      this.startTimer();
    }
  },
  mounted() {
    this.fetchQuestionFromBackend(); // Load the first question when the component mounts
    this.startTimer();
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>

<style scoped>
.wrapper {
  margin: auto;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  padding: 1.5rem;
  color: white;
  border-radius: 10px 10px 0 0;
  border-bottom: rgba(0, 0, 0, 0.1) solid 8px;
}

.question {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 20px 0;
  text-align: center;
  min-height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.answers {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin: 10px;
}

button {
  padding: 3rem 0;
  font-size: 1rem;
  border: 2px solid #333;
  border-radius: 5px;
  cursor: pointer;
  background-color: #3498db;
  color: white;
  transition: background-color 0.2s ease;
}

button:hover {
  background-color: #2980b9;
}
</style>
