<template>
  <div v-if="loading" class="loader">Loading...</div>
  <div class="wrapper" v-if="questions.length > 0">
    <div class="header">
      <span class="title">Question {{ currentQuestionNumber }}</span>
      <span class="score">Score: {{ totalScore }}</span>
    </div>

    <!-- Question Text -->
    <div class="question">
      <h2>{{ currentQuestion.question }}</h2> <!-- Updated to currentQuestion.question -->
    </div>

    <!-- Answer Options -->
    <div class="answers">
      <button v-for="(option, index) in currentQuestion.options" :key="index" @click="selectAnswer(index)">
        {{ option }}
      </button>
    </div>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      loading: true, // Loader state
      currentQuestionNumber: 1,
      totalScore: 0,
      timeLeft: 100000,
      timer: null,
      questions: [],
      currentQuestionIndex: 0,
      currentQuestion: {
        question: '',
        options: [],
        correctAnswerIndex: null
      }
    };
  },
  methods: {
    async fetchQuestionsFromBackend() {
      this.loading = true; // Start loading

      // Get topics and difficulty from route query parameters
      const { topic1, topic2, topic3, difficulty } = this.$route.query;

      // Combine the topics for a meaningful API request
      const topics = [topic1, topic2, topic3].filter(Boolean).join(', ');

      try {
        const response = await axios.post('http://localhost:5001/api/questions', {
          topics, // Send topics as a combined string
          difficulty, // Send difficulty as chosen by the user
          numberOfQuestions: 9
        });
        this.questions = response.data;

        // Load the first question
        if (this.questions.length > 0) {
          this.currentQuestion = this.questions[this.currentQuestionIndex];
        } else {
          console.warn("No questions were fetched from backend.");
        }
      } catch (error) {
        console.error("Failed to fetch questions from backend:", error);
      } finally {
        this.loading = false; // Stop loading once response is received
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
    nextQuestion() {
      clearInterval(this.timer);
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
        this.currentQuestion = this.questions[this.currentQuestionIndex];
        this.currentQuestionNumber++;
        this.startTimer();
      } else {
        alert('Quiz complete! Your score is: ' + this.totalScore);
      }
    }
  },
  async mounted() {
    await this.fetchQuestionsFromBackend();
    if (this.questions.length > 0) this.startTimer();
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

.loader {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  color: #3498db;
  padding: 20px;
  animation: spin 1s linear infinite;
}

/* Simple spinning animation for the loader */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
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
