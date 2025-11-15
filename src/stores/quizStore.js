import { reactive } from 'vue';

const state = reactive({
  lastResult: null,
});

export function useQuizStore() {
  return state;
}

export function clearQuizResult() {
  state.lastResult = null;
}
