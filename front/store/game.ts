import { defineStore } from 'pinia'
/* 
interface Game {
  state: { gameStatus: string },
  id: string,
  players: []
} */

const useGameStore = defineStore('game', () => {
  const game: Ref<any | undefined> = ref(undefined)

  return { game }
})

export default useGameStore