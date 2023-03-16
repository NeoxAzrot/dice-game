import useGameStore from '~~/store/game';
import { storeToRefs } from 'pinia'

interface JoinOrCreateGame {
  success: boolean,
  data: {
    id: string,
  },
}

const useGame = () => {
  const { API_ENDPOINT: endpoint } = useRuntimeConfig().public
  const { game } = storeToRefs(useGameStore());

  const create: () => Promise<JoinOrCreateGame> = () => {
    return $fetch(endpoint + '/games', {
      method: 'POST',
      body: JSON.stringify({ roomId: useRoute().params.room })
    })
  }

  return { game, create }
}

export default useGame;