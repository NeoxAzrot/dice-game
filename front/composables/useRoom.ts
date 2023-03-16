import { storeToRefs } from "pinia";
import useRoomStore from "~~/store/room";

export default function useRoom() {
  const { API_ENDPOINT: endpoint } = useRuntimeConfig().public
  const { username, roomID } = useStore()

  const { room, users } = storeToRefs(useRoomStore());

  const join: (ID: string) => Promise<any> = (ID: string) => {
    return $fetch(endpoint + `/rooms/${ID}/join`, {
      method: 'POST',
      body: JSON.stringify({ username: username.value })
    })
  }

  const create: () => Promise<any> = () => {
    return $fetch(endpoint + '/rooms', {
      method: 'POST',
      body: JSON.stringify({ username: username.value })
    })
  }

  const verify = (ID: string) => {
    return $fetch(endpoint + `/rooms/${ID}`, {
      method: 'GET',
    })
  }

  const leave = () => {
    return $fetch(endpoint + `/rooms/${useRoute().params.room}`, {
      method: 'DELETE',
    })
  }

  const abandon = () => {
    return $fetch(endpoint + `/rooms/${useRoute().params.room}/users/${useCookie('dice-game-user-id').value}`, {
      method: 'PUT',
    })
  }
  return { room, users, join, create, verify, leave, abandon }
} 