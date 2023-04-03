import { defineStore } from 'pinia';

const useGameStore = defineStore('game', () => {
  const game: Ref<any | undefined> = ref(undefined);

  return { game };
});

export default useGameStore;
