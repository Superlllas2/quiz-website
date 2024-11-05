<template>
  <div v-if="loading" class="loader">Loading...</div>
  <div class="wrapper" v-if="questions.length > 0">
    <div class="header-game">
      <span class="title">Question {{ currentQuestionNumber }}</span>
      <span class="score">Score: {{ totalScore }}</span>
    </div>

    <!-- Question Text -->
    <div class="question">
      <h2>{{ currentQuestion.question }}</h2>
    </div>

    <!-- Answer Options with Timer in Center -->
    <div class="answer-timer-wrapper">
      <div class="answers">
        <button v-for="(option, index) in currentQuestion.options" :key="index" @click="selectAnswer(index)">
          {{ option }}
          <!-- Only render the timer inside the first button using a span instead of div -->
          <span v-if="index === 0" class="timer">
            <span>{{ timeLeft }}</span>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from '../../src/api.js'

export default {
  data() {
    return {
      loading: true, // Loader state
      currentQuestionNumber: 1,
      totalScore: 0,
      defaultTime: 15,
      timeLeft: this.defaultTime,
      timer: null,
      questions: [],
      currentQuestionIndex: 0,
      currentQuestion: {
        question: '',
        options: [],
        answer_index: null
      }
    };
  },
  methods: {
    async fetchQuestionsFromBackend() {
      this.loading = true;

      const {topic1, topic2, topic3, difficulty} = this.$route.query;
      const topics = [topic1, topic2, topic3].filter(Boolean).join(', ');

      try {
        const response = await apiClient.post('api/questions', {
          topics,
          difficulty,
          numberOfQuestions: 9
        });
        this.questions = response.data;

        if (this.questions.length > 0) {
          this.currentQuestion = this.questions[this.currentQuestionIndex];
        } else {
          console.warn("No questions were fetched from backend.");
        }
      } catch (error) {
        console.error("Failed to fetch questions from backend:", error);
      } finally {
        this.loading = false;
      }
    },
    startTimer() {
      this.timeLeft = this.defaultTime;
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
      if (index === this.currentQuestion.answer_index) {
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
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.header-game {
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
  margin: 0 5px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  h2 {
    margin: 0;
  }
}

.answer-timer-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.answers {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  width: 100%;
  padding: 10px;
  margin-top: 10px;
}

button {
  padding: clamp(10px, 4vw, 50px) 0;
  font-size: 1rem;
  border: 2px solid #333;
  border-radius: 5px;
  cursor: pointer;
  background-color: #3498db;
  color: white;
  transition: background-color 0.2s ease;
  position: relative;
}

button:nth-child(1)::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 13px;
  height: 13px;
  background-color: #333;
  border-top-left-radius: 150%;
}

button:nth-child(2)::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 13px;
  height: 13px;
  background-color: #333;
  border-top-right-radius: 150%;
}

button:nth-child(3)::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 13px;
  height: 13px;
  background-color: #333;
  border-bottom-left-radius: 120%;
}

button:nth-child(4)::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 13px;
  height: 13px;
  background-color: #333;
  border-bottom-right-radius: 120%;
}

button:hover {
  background-color: #2980b9;
}

.timer {
  position: absolute;
  top: 100%;
  left: 100%;
  transform: translate(-25%, -25%);
  width: 1.6rem;
  height: 1.6rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: #3498db;
  z-index: 1;

  span {
    text-align: center;
  }
}
</style>
