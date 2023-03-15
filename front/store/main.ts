import { defineStore } from 'pinia'

const useMainStore = defineStore('main', () => {
  const username: Ref<string | undefined> = ref(undefined)
  const roomID: Ref<string | undefined> = ref(undefined)

  return { username, roomID }
})

export default useMainStore