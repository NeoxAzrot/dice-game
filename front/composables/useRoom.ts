export default function useRoom() {
  const { API_ENDPOINT: endpoint } = useRuntimeConfig().public

  const join = (ID: string) => {
    return $fetch(endpoint + '/room/join', {
      method: 'POST',
      body: JSON.stringify({ roomID: ID })
    })
  }

  const create = () => {
    return $fetch(endpoint + '/room/create', {
      method: 'POST',
      body: JSON.stringify({ name: 'test' })
    })
  }

  const newLaunch = () => {
    const currentRoom: Ref<string | null> = ref(null)
    if (!currentRoom) throw new Error('No room selected')

    return $fetch(endpoint + `/room/${currentRoom}/launch`, {
      method: 'POST',
      body: JSON.stringify({ player: 'youPlayerID' })
    })
  }

  return { join, create, newLaunch }
} 