import { defineStore } from 'pinia'

const useGlobalStore = defineStore('global', () => {
  const username: Ref<string | undefined> = ref(undefined)
  const roomID: Ref<string | undefined> = ref(undefined)

  return { username, roomID }
})

export default useGlobalStore