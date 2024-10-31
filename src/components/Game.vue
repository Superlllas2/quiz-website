<template>
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
        {{ option }} <!-- Updated to currentQuestion.options -->
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
      questions: [], // Store all fetched questions here
      currentQuestionIndex: 0, // Track the current question index
      currentQuestion: {
        text: '',
        answers: [],
        correctAnswerIndex: null
      }
    };
  },
  methods: {
    async fetchQuestionsFromBackend() {
      try {
        const response = await axios.post('http://localhost:5001/api/questions', {
          topic: 'science', // Hardcoded topic, modify as needed
          numberOfQuestions: 9
        });

        this.questions = response.data; // Store all questions received from the backend
        console.log("Fetched Questions:", this.questions); // Check the data structure

        // Load the first question
        if (this.questions.length > 0) {
          this.currentQuestion = this.questions[this.currentQuestionIndex];
          console.log("First Current Question:", this.currentQuestion); // Verify current question
        } else {
          console.warn("No questions were fetched from the backend.");
        }
      } catch (error) {
        console.error("Failed to fetch questions from backend:", error);
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
        // Move to the next question
        this.currentQuestionIndex++;
        this.currentQuestion = this.questions[this.currentQuestionIndex];
        this.currentQuestionNumber++;
        console.log("Next Current Question:", this.currentQuestion); // Log each new question
        this.startTimer(); // Restart timer for the next question
      } else {
        alert('Quiz complete! Your score is: ' + this.totalScore);
      }
    }
  },
  async mounted() {
    await this.fetchQuestionsFromBackend(); // Load all questions when the component mounts
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
