import { defineStore } from 'pinia'

const useGameStore = defineStore('game', () => {
  const game: Ref<Object | undefined> = ref('dsq')

  return { game }
})

export default useGameStore