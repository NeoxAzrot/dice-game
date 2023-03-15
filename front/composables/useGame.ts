import useGameStore from '~~/store/game';
import { storeToRefs } from 'pinia'

const useGame = () => {
  const store = storeToRefs(useGameStore());
  return store
}

export default useGame;