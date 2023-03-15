import { storeToRefs } from "pinia";
import useRoomStore from "~~/store/room";

export default function useRoom() {
  const { API_ENDPOINT: endpoint } = useRuntimeConfig().public
  const { username } = useStore()

  const { room } = storeToRefs(useRoomStore());

  const join = (ID: string) => {
    return $fetch(endpoint + `/rooms/${ID}/join`, {
      method: 'POST',
      body: JSON.stringify({ username: username })
    })
  }

  const create = () => {
    return $fetch(endpoint + '/rooms/create', {
      method: 'POST',
      body: JSON.stringify({ username: username })
    })
  }

  const verify = (ID: string) => {
    return $fetch(endpoint + `/rooms/${ID}`, {
      method: 'GET',
    })
  }

  return { room, join, create, verify }
} 