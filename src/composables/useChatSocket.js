import { ref, onBeforeUnmount } from 'vue';
import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.PROD
    ? 'https://quest-nest-backend-a0171c77d032.herokuapp.com'
    : (import.meta.env.VITE_SOCKET_URL ?? 'http://localhost:5001');

export function useChatSocket() {
  const socket = io(SOCKET_URL, {
    withCredentials: true,
  });

  const messages = ref([]);
  const connected = ref(socket.connected);

  const handleConnect = () => {
    connected.value = true;
  };

  const handleDisconnect = () => {
    connected.value = false;
  };

  const handleIncomingMessage = (payload) => {
    if (!payload) return;
    messages.value.push(payload);
  };

  socket.on('connect', handleConnect);
  socket.on('disconnect', handleDisconnect);
  socket.on('chat:message', handleIncomingMessage);

  const sendMessage = (payload) => {
    if (!payload || !payload.message?.trim()) {
      return;
    }

    socket.emit('chat:message', payload);
  };

  onBeforeUnmount(() => {
    socket.off('connect', handleConnect);
    socket.off('disconnect', handleDisconnect);
    socket.off('chat:message', handleIncomingMessage);
    socket.disconnect();
  });

  return {
    messages,
    connected,
    sendMessage,
  };
}
