export default function useRoom() {
  const { API_ENDPOINT: endpoint } = useRuntimeConfig().public
  console.log(endpoint)
}