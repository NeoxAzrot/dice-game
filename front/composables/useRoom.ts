import { storeToRefs } from "pinia";
import useRoomStore from "~~/store/room";

export default function useRoom() {
  const { API_ENDPOINT: endpoint } = useRuntimeConfig().public
  const { username } = useStore()

  const { room, users } = storeToRefs(useRoomStore());

  const join = (ID: string) => {
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

  const fetchNames = async () => {
    const usernames: string[] = []
    for (const player of room.value.players) {
      const { data }: any = await $fetch(endpoint + `/users/${player}/`, {
        method: 'GET',
      })
      usernames.push(data.username)
    }
    users.value = usernames
    return usernames
  }
  return { room, users, join, create, verify, fetchNames }
} 