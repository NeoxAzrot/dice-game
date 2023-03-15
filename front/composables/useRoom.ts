export default function useRoom() {
  const { API_ENDPOINT: endpoint } = useRuntimeConfig().public
  const { username, roomID } = useStore()

  const join = () => {
    return $fetch(endpoint + `/room/${roomID}/join`, {
      method: 'POST',
      body: JSON.stringify({ user: username })
    })
  }

  const create = () => {
    return $fetch(endpoint + '/room/create', {
      method: 'POST',
      body: JSON.stringify({ user: username })
    })
  }

  return { join, create }
} 