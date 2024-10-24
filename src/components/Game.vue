<script>
export default {
  data() {
    return {
      currentQuestionNumber: 1,
      totalScore: 0,
      timeLeft: 10,
      timer: null,
      currentQuestion: {
        text: 'What is the capital of France?',
        answers: ['Berlin', 'Madrid', 'Paris', 'Rome'],
        correctAnswerIndex: 2 // The correct answer (Paris)
      },
      questions: [
        // You can add more static questions for now to test
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
      // Start a countdown timer
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
      // Handle time expiration, move to next question
      clearInterval(this.timer);
      this.nextQuestion();
    },
    selectAnswer(index) {
      // Check if the selected answer is correct
      if (index === this.currentQuestion.correctAnswerIndex) {
        this.totalScore += 10; // Add to total score if the answer is correct
      }
      this.nextQuestion(); // Move to the next question
    },
    nextQuestion() {
      clearInterval(this.timer); // Clear the current timer
      if (this.currentQuestionNumber < this.questions.length) {
        this.currentQuestionNumber++;
        this.currentQuestion = this.questions[this.currentQuestionNumber - 1]; // Load the next question
        this.startTimer(); // Restart the timer for the new question
      } else {
        alert('Quiz complete! Your score is: ' + this.totalScore);
        // Optionally, you could reset the game or navigate to a results page
      }
    }
  },
  mounted() {
    // Start the timer when the component mounts
    this.startTimer();
  },
  beforeDestroy() {
    // Clear the timer if the component is destroyed (e.g., user navigates away)
    clearInterval(this.timer);
  }
};
</script>

<template>
  <div class="game">
    <!-- Question Number -->
    <h1>Question {{ currentQuestionNumber }}</h1>

    <!-- Timer -->
    <div class="timer">
      <span>Time left: {{ timeLeft }}s</span>
    </div>

    <!-- Total Score -->
    <div class="score">
      <span>Total Score: {{ totalScore }}</span>
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

<style scoped>
.game {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.timer, .score {
  margin: 10px 0;
}

.answers {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

button:hover {
  background-color: #2980b9;
}
</style>