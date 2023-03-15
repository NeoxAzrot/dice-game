export default function useRoom() {
  const { API_ENDPOINT: endpoint } = useRuntimeConfig().public

  const join = (ID: string) => {
    const currentUser: Ref<string | null> = ref(null)

    return $fetch(endpoint + `/room/${ID}/join`, {
      method: 'POST',
      body: JSON.stringify({ user: currentUser })
    })
  }

  const create = () => {
    const currentUser: Ref<string | null> = ref(null)

    return $fetch(endpoint + '/room/create', {
      method: 'POST',
      body: JSON.stringify({ user: currentUser })
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