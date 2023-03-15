import { defineStore } from 'pinia'

const useGameStore = defineStore('game', () => {
  const game: Ref<Object | undefined> = ref(undefined)

  return { game }
})

export default useGameStore