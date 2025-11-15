<script>
import apiClient from '../../src/api.js'

export default {
  data() {
    return {
      topic1: '',
      topic2: '',
      topic3: '',
      topic1Valid: true,
      topic2Valid: true,
      topic3Valid: true,
      selectedOption: '',
      options: ['Friendly', 'Easy', 'Intermediate', 'Hard', 'Immortal'],
      presets: ['Indie games of 2010s', 'Studio Ghibli lore', '90s hip-hop anthems']
    }
  },
  mounted() {
    this.fetchProtectedData();
  },
  methods: {
    checkFields() {
      this.topic1Valid = this.topic1.trim() !== '';
      this.topic2Valid = this.topic2.trim() !== '';
      this.topic3Valid = this.topic3.trim() !== '';
      const allValid = this.topic1Valid && this.topic2Valid && this.topic3Valid && this.selectedOption;

      if (allValid) {
        this.navigateToGame();
      } else {
        alert("Please fill in all topics and pick a difficulty badge.");
      }
    },
    navigateToGame() {
      this.$router.push({
        path: '/game',
        query: {
          topic1: this.topic1,
          topic2: this.topic2,
          topic3: this.topic3,
          difficulty: this.selectedOption
        }
      });
    },
    async fetchProtectedData() {
      try {
        const headers = {};

        if (import.meta.env.MODE === 'production') {
          const token = localStorage.getItem('token');
          headers.Authorization = `Bearer ${token}`;
        }

        await apiClient.get('/protected/create', { headers });
      } catch (error) {
        console.error('Failed to fetch protected data:', error);
      }
    },
    usePreset(preset) {
      const slots = ['topic1', 'topic2', 'topic3'];
      const emptySlot = slots.find(slot => !this[slot]);
      if (emptySlot) {
        this[emptySlot] = preset;
      } else {
        this.topic3 = preset;
      }
    },
    selectDifficulty(option) {
      this.selectedOption = option;
    }
  }
}
</script>

<template>
  <form class="topic-card" @submit.prevent="checkFields">
    <div class="topic-header">
      <p class="eyebrow">Step 1 of 2</p>
      <h1>Choose your arenas</h1>
      <p class="subcopy">Add three topics so the generator can stitch a unique quiz.</p>
    </div>

    <div class="topic-grid">
      <label class="input-field">
        <span>Topic 1</span>
        <input v-model="topic1" placeholder="E.g. best FPS games of 2010s" required :class="{ 'error': !topic1Valid }"/>
      </label>
      <label class="input-field">
        <span>Topic 2</span>
        <input v-model="topic2" placeholder="E.g. anime from 2000s" required :class="{ 'error': !topic2Valid }"/>
      </label>
      <label class="input-field">
        <span>Topic 3</span>
        <input v-model="topic3" placeholder="E.g. rap artists of the 90s" required :class="{ 'error': !topic3Valid }"/>
      </label>
    </div>

    <div class="presets">
      <span class="subtle">Need inspo?</span>
      <div class="chips">
        <button type="button" v-for="preset in presets" :key="preset" @click="usePreset(preset)">{{ preset }}</button>
      </div>
    </div>

    <div class="difficulty">
      <p class="eyebrow">Step 2 of 2</p>
      <h2>Pick a difficulty badge</h2>
      <div class="difficulty-grid">
        <button
          v-for="option in options"
          :key="option"
          type="button"
          :class="['badge', { active: selectedOption === option }]"
          @click="selectDifficulty(option)"
        >
          {{ option }}
        </button>
      </div>
    </div>

    <button type="submit" class="primary">Launch game</button>
  </form>
</template>

<style scoped>
.topic-card {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.topic-header h1,
.difficulty h2 {
  margin: 0;
}

.subcopy {
  color: var(--text-muted);
}

.topic-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

.input-field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.input-field span {
  font-weight: 600;
}

input {
  width: 100%;
  padding: 0.85rem 1rem;
  border-radius: 14px;
  border: 1px solid var(--panel-border);
  background: rgba(255, 255, 255, 0.04);
  color: var(--text-primary);
}

input:focus {
  outline: 2px solid var(--accent);
}

.error {
  border-color: var(--error);
}

.presets {
  background: rgba(255, 255, 255, 0.02);
  border-radius: 20px;
  padding: 1rem;
  border: 1px dashed var(--panel-border);
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.75rem;
}

.chips button {
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  border: 1px solid var(--panel-border);
  background: transparent;
  color: var(--text-primary);
}

.difficulty-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.75rem;
  margin-top: 1rem;
}

.badge {
  border-radius: 16px;
  border: 1px solid var(--panel-border);
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.03);
  color: var(--text-primary);
}

.badge.active {
  border-color: transparent;
  background: linear-gradient(120deg, var(--accent), var(--accent-2));
  color: #05060f;
  font-weight: 600;
}

button.primary {
  width: 100%;
  border: none;
  border-radius: 16px;
  padding: 0.9rem 1rem;
  font-weight: 600;
  background: linear-gradient(120deg, var(--accent), var(--accent-2));
  color: #05060f;
  box-shadow: 0 12px 20px rgba(12, 200, 255, 0.25);
}

.subtle {
  color: var(--text-muted);
}
</style>
