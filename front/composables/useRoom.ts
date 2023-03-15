import { storeToRefs } from "pinia";
import useRoomStore from "~~/store/room";

export default function useRoom() {
  const { API_ENDPOINT: endpoint } = useRuntimeConfig().public
  const { username } = useStore()

  const { room } = storeToRefs(useRoomStore());

  const join = (ID: string) => {
    return $fetch(endpoint + `/room/${ID}/join`, {
      method: 'POST',
      body: JSON.stringify({ username: username })
    })
  }

  const create = () => {
    return $fetch(endpoint + '/room/create', {
      method: 'POST',
      body: JSON.stringify({ username: username })
    })
  }

  return { room, join, create }
} 