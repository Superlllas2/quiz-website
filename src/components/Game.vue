<template>
  <div v-if="loading" class="loader">Generating your custom quiz…</div>
  <section class="game-panel" v-else>
    <header class="game-meta">
      <div>
        <p class="eyebrow">Question {{ currentQuestionNumber }} / {{ questions.length }}</p>
        <p class="score">Score: {{ totalScore }}</p>
      </div>
      <div class="timer-chip" :class="{ danger: timeLeft <= 5 }">
        ⏱ {{ timeLeft }}s
      </div>
    </header>

    <div class="progress-bar">
      <span :style="{ width: progressPercent + '%' }"></span>
    </div>

    <article class="question-card">
      <h2>{{ currentQuestion.question }}</h2>
      <p v-if="statusText" :class="['status', statusTone]">{{ statusText }}</p>
    </article>

    <div class="answer-grid">
      <button
        v-for="(option, index) in currentQuestion.options"
        :key="index"
        @click="selectAnswer(index)"
        :disabled="showFeedback"
        :class="answerClass(index)"
      >
        <span class="letter">{{ String.fromCharCode(65 + index) }}</span>
        <span class="option">{{ option }}</span>
      </button>
    </div>
  </section>
</template>

<script>
import apiClient, { saveQuizResult } from '../../src/api.js'
import { useQuizStore } from '@/stores/quizStore.js'

const quizStore = useQuizStore();

export default {
  data() {
    return {
      loading: true,
      currentQuestionNumber: 1,
      totalScore: 0,
      defaultTime: 15,
      timeLeft: 15,
      timer: null,
      questions: [],
      currentQuestionIndex: 0,
      currentQuestion: {
        question: '',
        options: [],
        answer_index: null
      },
      showFeedback: false,
      selectedAnswer: null,
      statusText: '',
      statusTone: 'neutral',
      answerLog: [],
      quizStartTimestamp: null,
      selectedTopics: [],
      selectedDifficulty: 'Unknown',
      hasSubmittedResult: false
    };
  },
  computed: {
    progressPercent() {
      if (!this.questions.length) return 0;
      return ((this.currentQuestionNumber - 1) / this.questions.length) * 100;
    }
  },
  methods: {
    async fetchQuestionsFromBackend() {
      this.loading = true;

      const { topic1, topic2, topic3, difficulty } = this.$route.query;
      const topicValues = [topic1, topic2, topic3].filter(Boolean);
      const topics = topicValues.join(', ');
      this.selectedTopics = topicValues;
      this.selectedDifficulty = difficulty || 'Unknown';

      try {
        const response = await apiClient.post('questions', {
          topics,
          difficulty,
          numberOfQuestions: 9
        });
        this.questions = response.data;

        if (this.questions.length > 0) {
          this.currentQuestion = this.questions[this.currentQuestionIndex];
        }
      } catch (error) {
        console.error("Failed to fetch questions from backend:", error);
      } finally {
        this.loading = false;
      }
    },
    startTimer() {
      this.timeLeft = this.defaultTime;
      this.showFeedback = false;
      this.selectedAnswer = null;
      this.statusText = '';
      this.statusTone = 'neutral';
      if (!this.quizStartTimestamp) {
        this.quizStartTimestamp = Date.now();
      }
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
      this.statusText = 'Time is up!';
      this.statusTone = 'error';
      this.showFeedback = true;
      this.recordAnswer({ selectedIndex: null, isCorrect: false });
      setTimeout(() => this.nextQuestion(), 1000);
    },
    selectAnswer(index) {
      if (this.showFeedback) return;
      clearInterval(this.timer);
      this.selectedAnswer = index;
      const isCorrect = index === this.currentQuestion.answer_index;
      if (isCorrect) {
        this.totalScore += 10;
        this.statusText = '+10 pts! Nicely done.';
        this.statusTone = 'success';
      } else {
        this.statusText = 'Not quite-keep going!';
        this.statusTone = 'error';
      }
      this.recordAnswer({ selectedIndex: index, isCorrect });
      this.showFeedback = true;
      setTimeout(() => this.nextQuestion(), 1200);
    },
    recordAnswer({ selectedIndex, isCorrect }) {
      const userAnswerText =
        selectedIndex !== null ? this.currentQuestion.options[selectedIndex] : null;
      const correctAnswerText = this.currentQuestion.options[this.currentQuestion.answer_index] ?? '';

      this.answerLog.push({
        questionText: this.currentQuestion.question,
        userAnswer: userAnswerText,
        correctAnswer: correctAnswerText,
        isCorrect
      });
    },
    answerClass(index) {
      if (!this.showFeedback) return '';
      if (index === this.currentQuestion.answer_index) return 'correct';
      if (index === this.selectedAnswer) return 'incorrect';
      return 'neutral';
    },
    nextQuestion() {
      clearInterval(this.timer);
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
        this.currentQuestion = this.questions[this.currentQuestionIndex];
        this.currentQuestionNumber++;
        this.startTimer();
      } else {
        this.finishQuiz();
      }
    },
    finishQuiz() {
      const totalQuestions = this.questions.length;
      const correctAnswersCount = this.answerLog.filter((entry) => entry.isCorrect).length;
      const timeTakenSeconds = this.quizStartTimestamp
          ? Math.round((Date.now() - this.quizStartTimestamp) / 1000)
          : 0; // backend expects a number >= 0

      // This stays for your local UI (ResultsView)
      quizStore.lastResult = {
        totalQuestions,
        correctAnswersCount,
        score: this.totalScore,
        questions: this.answerLog.map((entry) => ({ ...entry })),
        topics: [...this.selectedTopics],
        difficulty: this.selectedDifficulty,
        timeTakenSeconds
      };

      // Normalize difficulty for backend enum
      const allowedDifficulties = ['Friendly', 'Easy', 'Intermediate', 'Hard', 'Immortal'];
      const normalizedDifficulty = allowedDifficulties.includes(this.selectedDifficulty)
          ? this.selectedDifficulty
          : undefined;

      const payload = {
        topics: this.selectedTopics,
        numberOfQuestions: totalQuestions,
        correctCount: correctAnswersCount,
        totalTimeSeconds: timeTakenSeconds,
        // let Mongoose auto-compute accuracy via pre('save')
        visibility: 'public',
        status: 'completed'
      };

      if (normalizedDifficulty) {
        payload.difficulty = normalizedDifficulty;
      }

      this.persistQuizResult(payload);

      this.$router.push('/results');
    },
    async persistQuizResult(summary) {
      if (this.hasSubmittedResult) return;
      this.hasSubmittedResult = true;
      try {
        await saveQuizResult(summary);
      } catch (error) {
        console.error('Failed to save quiz result:', error);
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
.game-panel {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.game-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.score {
  margin: 0;
  color: var(--text-muted);
}

.timer-chip {
  padding: 0.45rem 1rem;
  border-radius: 999px;
  background: var(--accent-soft);
  color: var(--accent);
  font-weight: 600;
}

.timer-chip.danger {
  background: rgba(248, 113, 113, 0.2);
  color: var(--error);
}

.progress-bar {
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 999px;
  overflow: hidden;
}

.progress-bar span {
  display: block;
  height: 100%;
  background: linear-gradient(120deg, var(--accent), var(--accent-2));
}

.question-card {
  padding: 1.5rem;
  border-radius: 24px;
  border: 1px solid var(--panel-border);
  background: rgba(255, 255, 255, 0.02);
}

.question-card h2 {
  margin: 0;
}

.status {
  margin-top: 0.75rem;
  font-weight: 600;
}

.status.success {
  color: var(--success);
}

.status.error {
  color: var(--error);
}

.answer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

.answer-grid button {
  border-radius: 18px;
  border: 1px solid var(--panel-border);
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.85rem;
  background: rgba(255, 255, 255, 0.03);
  color: var(--text-primary);
  transition: transform 0.15s ease, border 0.15s ease;
}

.answer-grid button:not(:disabled):hover {
  transform: translateY(-3px);
}

.letter {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid var(--panel-border);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.correct {
  border-color: var(--success);
  background: rgba(74, 222, 128, 0.15);
}

.incorrect {
  border-color: var(--error);
  background: rgba(248, 113, 113, 0.15);
}

.neutral {
  opacity: 0.7;
}

.loader {
  font-size: 1.2rem;
  text-align: center;
  padding: 2rem;
}
</style>
