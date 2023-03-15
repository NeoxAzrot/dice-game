import useGameStore from '~~/store/game';
import { storeToRefs } from 'pinia'

const useGame = () => {
  const { game } = storeToRefs(useGameStore());
  return game
}

export default useGame;