<template>
  <div class="wrapper">
    <div class="header">
      <span>Question {{ currentQuestionNumber }}</span>
      <span>Score: {{ totalScore }}</span>
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
export default {
  data() {
    return {
      currentQuestionNumber: 1,
      totalScore: 0,
      timeLeft: 100000,
      timer: null,
      currentQuestion: {
        text: 'What is the capital of France?',
        answers: ['Berlin', 'Madrid', 'Paris', 'Rome'],
        correctAnswerIndex: 2
      },
      questions: [
        {
          text: 'What is the capital of France?',
          answers: ['Berlin', 'Madrid', 'Paris', 'Rome'],
          correctAnswerIndex: 2
        },
        {
          text: 'What is 2 + 2?',
          answers: ['3', '4', '5', '6'],
          correctAnswerIndex: 1
        },
        {
          text: 'Which planet is known as the Red Planet?',
          answers: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
          correctAnswerIndex: 1
        }
      ]
    };
  },
  methods: {
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
      if (this.currentQuestionNumber < this.questions.length) {
        this.currentQuestionNumber++;
        this.currentQuestion = this.questions[this.currentQuestionNumber - 1];
        this.startTimer();
      } else {
        alert('Quiz complete! Your score is: ' + this.totalScore);
      }
    }
  },
  mounted() {
    // this.startTimer();
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>

<style scoped>
.wrapper {
  width: 90%;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  padding: 20px 0;
  background-color: black;
}

.question {
  font-size: 1.25rem;
  font-weight: bold;
  margin: 20px 0;
  text-align: center;
}

.answers {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 20px;

}

button {
  padding: 10px;
  font-size: 1rem;
  border: 2px solid #333;
  border-radius: 5px;
  cursor: pointer;
  background-color: #3498db;
  transition: background-color 0.2s ease;
}

button:hover {
  background-color: #2980b9;
}
</style>
