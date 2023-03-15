export default function useRoom() {
  const { API_ENDPOINT: endpoint } = useRuntimeConfig().public

  const join = () => {
    return $fetch(endpoint + '/room/join', {
      method: 'POST',
      body: JSON.stringify({ name: 'test' })
    })
  }

  const create = () => {
    return $fetch(endpoint + '/room/create', {
      method: 'POST',
      body: JSON.stringify({ name: 'test' })
    })
  }

  return { join, create }
} 