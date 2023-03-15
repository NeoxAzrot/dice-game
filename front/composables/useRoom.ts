export default function useRoom() {
  const { API_ENDPOINT: endpoint } = useRuntimeConfig().public
  const { username } = useStore()

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

  return { join, create }
} 