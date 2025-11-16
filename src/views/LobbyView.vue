<template>
  <div class="lobby">
    <h1>Multiplayer Lobby Chat</h1>
    <p class="status" :class="{ connected }">
      {{ connected ? 'Connected to lobby' : 'Connecting to server...' }}
    </p>

    <div class="username">
      <label for="username">Display name</label>
      <input
        id="username"
        v-model="username"
        type="text"
        placeholder="Enter your name or stay Anonymous"
      />
    </div>

    <div class="chat-window" ref="messagesContainer">
      <div v-if="!messages.length" class="empty">No messages yet. Start the conversation!</div>
      <div v-for="(message, index) in messages" :key="index" class="message">
        <div class="meta">
          <strong>{{ message.username || 'Anonymous' }}</strong>
          <small>{{ formatTimestamp(message.timestamp) }}</small>
        </div>
        <p>{{ message.message }}</p>
      </div>
    </div>

    <form class="composer" @submit.prevent="handleSend">
      <input
        v-model="currentMessage"
        type="text"
        placeholder="Type your message"
        :disabled="!connected"
      />
      <button type="submit" :disabled="!connected || !currentMessage.trim()">
        Send
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue';
import { useChatSocket } from '@/composables/useChatSocket.js';

const { messages, connected, sendMessage } = useChatSocket();

const username = ref('');
const currentMessage = ref('');
const messagesContainer = ref(null);

watch(
  () => messages.value.length,
  async () => {
    await nextTick();
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  }
);

const formatTimestamp = (timestamp) => {
  if (!timestamp) return '';
  return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const handleSend = () => {
  const text = currentMessage.value.trim();
  if (!text) return;

  const payload = {
    username: username.value.trim() || 'Anonymous',
    message: text,
    timestamp: new Date().toISOString(),
  };

  sendMessage(payload);
  currentMessage.value = '';
};
</script>

<style scoped>
.lobby {
  max-width: 720px;
  margin: 0 auto;
  padding: 2rem 1rem 3rem;
}

h1 {
  margin-bottom: 0.25rem;
}

.status {
  margin-bottom: 1.5rem;
  color: #b45309;
}

.status.connected {
  color: #15803d;
}

.username label {
  display: block;
  margin-bottom: 0.25rem;
  font-weight: 600;
}

.username input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d4d4d8;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
}

.chat-window {
  border: 1px solid #e4e4e7;
  border-radius: 0.75rem;
  padding: 1rem;
  height: 320px;
  overflow-y: auto;
  background: #fafafa;
  margin-bottom: 1rem;
}

.empty {
  text-align: center;
  color: #71717a;
}

.message + .message {
  margin-top: 1rem;
}

.message .meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: #444;
}

.message p {
  margin: 0.25rem 0 0;
  line-height: 1.4;
}

.composer {
  display: flex;
  gap: 0.5rem;
}

.composer input {
  flex: 1;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid #d4d4d8;
}

.composer button {
  padding: 0 1.5rem;
  border: none;
  border-radius: 0.5rem;
  background: #2563eb;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
}

.composer button:disabled {
  background: #93c5fd;
  cursor: not-allowed;
}

.composer button:not(:disabled):hover {
  background: #1d4ed8;
}
</style>
