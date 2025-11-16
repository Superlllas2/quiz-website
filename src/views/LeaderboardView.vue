<template>
  <section class="leaderboard">
    <header class="leaderboard-header">
      <div>
        <p class="eyebrow">Top quiz runs</p>
        <h1>Leaderboard</h1>
        <p class="subtext">Latest {{ limit }} records ranked by accuracy.</p>
      </div>
      <button class="refresh" @click="loadLeaderboard" :disabled="loading">
        {{ loading ? 'Refreshing…' : 'Refresh' }}
      </button>
    </header>

    <div v-if="error" class="alert error">{{ error }}</div>
    <div v-else-if="loading" class="alert">Loading leaderboard…</div>
    <table v-else class="leaderboard-table">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Player</th>
          <th>Accuracy</th>
          <th>Correct</th>
          <th>Questions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!leaderboard.length">
          <td colspan="5" class="empty">No leaderboard entries yet.</td>
        </tr>
        <tr v-for="(entry, index) in leaderboard" :key="entry.id ?? index">
          <td>#{{ index + 1 }}</td>
          <td>{{ entry.user?.email || 'Unknown' }}</td>
          <td>{{ formatAccuracy(entry) }}%</td>
          <td>{{ entry.correctAnswersCount ?? 0 }}</td>
          <td>{{ entry.totalQuestions ?? 0 }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { fetchLeaderboard } from '@/api.js';

const leaderboard = ref([]);
const loading = ref(false);
const error = ref('');
const limit = 10;

const formatAccuracy = (entry) => {
  if (typeof entry.accuracy === 'number') {
    return entry.accuracy.toFixed(1);
  }
  const total = entry.totalQuestions ?? 0;
  const correct = entry.correctAnswersCount ?? 0;
  if (!total) return '0.0';
  return ((correct / total) * 100).toFixed(1);
};

async function loadLeaderboard() {
  loading.value = true;
  error.value = '';
  try {
    const response = await fetchLeaderboard(limit);
    leaderboard.value = response.data ?? [];
  } catch (err) {
    console.error('Failed to load leaderboard:', err);
    error.value = err.response?.data?.message || 'Unable to load leaderboard right now.';
  } finally {
    loading.value = false;
  }
}

onMounted(loadLeaderboard);
</script>

<style scoped>
.leaderboard {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.leaderboard-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.eyebrow {
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 0.2em;
  color: var(--text-muted);
  margin-bottom: 0.35rem;
}

.subtext {
  color: var(--text-muted);
}

.refresh {
  padding: 0.65rem 1.25rem;
  border-radius: 999px;
  border: 1px solid var(--panel-border);
  background: transparent;
  color: var(--text-primary);
  cursor: pointer;
}

.alert {
  padding: 0.85rem 1rem;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.06);
}

.alert.error {
  border: 1px solid var(--error);
  color: var(--error);
}

.leaderboard-table {
  width: 100%;
  border-collapse: collapse;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid var(--panel-border);
  border-radius: 20px;
  overflow: hidden;
}

th,
td {
  padding: 0.85rem 1rem;
  text-align: left;
}

th {
  background: rgba(255, 255, 255, 0.05);
  font-weight: 600;
}

tbody tr:nth-child(even) {
  background: rgba(255, 255, 255, 0.02);
}

.empty {
  text-align: center;
  color: var(--text-muted);
}
</style>
