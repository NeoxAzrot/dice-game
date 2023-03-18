import useGameStore from '~~/store/game';
import { storeToRefs } from 'pinia'

interface JoinOrCreateGame {
  success: boolean,
  data: {
    id: string,
  },
}

interface PlayGame {
  success: boolean,
  message?: string,
  data: {
    dices: [],
    combinations: []
  }
}

const useGame = () => {
  const { API_ENDPOINT: endpoint } = useRuntimeConfig().public
  const { game } = storeToRefs(useGameStore());

  const create: () => Promise<JoinOrCreateGame> = () => {
    return $fetch(endpoint + '/games', {
      method: 'POST',
      body: JSON.stringify({ roomId: useRoute().params.room, userId: useStore().userID.value })
    })
  }

  const ready = () => {
    return $fetch(endpoint + `/games/${game.value?.id}/ready`, {
      method: 'POST',
      body: JSON.stringify({ userId: useStore().userID.value })
    })
  }

  const play: (type: 'roll' | 'hold', diceKept?: Array<number>) => Promise<PlayGame> = (type, diceKept = []) => {
    return $fetch(endpoint + `/games/${game.value?.id}/play`, {
      method: 'POST',
      body: JSON.stringify({
        "userId": useStore().userID.value,
        "move": type,
        "dicesKept": diceKept
      })
    })
  }

  return { game, create, play, ready }
}

export default useGame;