<template>
  <section v-if="result" class="results-page">
    <header class="results-header">
      <div>
        <p class="eyebrow">Quiz Results</p>
        <h1>You scored {{ result.correctAnswersCount }} / {{ result.totalQuestions }}</h1>
        <p class="subtext">That's {{ percentage }}% correct.</p>
      </div>
      <div class="score-chip">{{ result.score }} pts</div>
    </header>

    <div class="answers-panel">
      <h2>Answer Review</h2>
      <div class="answers-list">
        <article
          v-for="(question, index) in result.questions"
          :key="index"
          class="answer-row"
          :class="question.isCorrect ? 'correct' : 'incorrect'"
        >
          <div class="question-heading">
            <span class="question-number">Q{{ index + 1 }}</span>
            <p class="question-text">{{ question.questionText }}</p>
          </div>
          <p class="answer"><strong>Your answer:</strong> {{ question.userAnswer ?? 'No answer' }}</p>
          <p class="answer"><strong>Correct answer:</strong> {{ question.correctAnswer }}</p>
        </article>
      </div>
    </div>

    <button class="primary" @click="goToCreate">Back to Create Quiz</button>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useQuizStore, clearQuizResult } from '@/stores/quizStore.js';

const router = useRouter();
const quizStore = useQuizStore();

const result = computed(() => quizStore.lastResult);
const percentage = computed(() => {
  if (!result.value?.totalQuestions) return 0;
  return Math.round((result.value.correctAnswersCount / result.value.totalQuestions) * 100);
});

onMounted(() => {
  if (!result.value) {
    router.replace('/create');
  }
});

function goToCreate() {
  clearQuizResult();
  router.push('/create');
}
</script>

<style scoped>
.results-page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-radius: 24px;
  border: 1px solid var(--panel-border);
  background: rgba(255, 255, 255, 0.02);
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
  color: var(--text-muted);
}

.subtext {
  color: var(--text-muted);
  margin-top: 0.35rem;
}

.score-chip {
  padding: 0.5rem 1.25rem;
  border-radius: 999px;
  background: var(--accent-soft);
  color: var(--accent);
  font-weight: 600;
}

.answers-panel {
  border-radius: 24px;
  border: 1px solid var(--panel-border);
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.2);
}

.answers-panel h2 {
  margin-top: 0;
}

.answers-list {
  max-height: 420px;
  overflow-y: auto;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-right: 0.5rem;
}

.answer-row {
  padding: 1rem;
  border-radius: 16px;
  border: 1px solid var(--panel-border);
  background: rgba(255, 255, 255, 0.02);
}

.answer-row.correct {
  border-color: var(--success);
}

.answer-row.incorrect {
  border-color: var(--error);
}

.question-heading {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 0.5rem;
}

.question-number {
  font-weight: 700;
  color: var(--text-muted);
}

.question-text {
  margin: 0;
}

.answer {
  margin: 0.25rem 0;
}

button.primary {
  align-self: flex-end;
  padding: 0.85rem 1.5rem;
  border-radius: 999px;
  border: none;
  background: linear-gradient(120deg, var(--accent), var(--accent-2));
  color: #fff;
  font-weight: 600;
  cursor: pointer;
}
</style>
