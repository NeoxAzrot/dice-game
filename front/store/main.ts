import { defineStore } from 'pinia'

const useStore = defineStore('main', () => {
  const username: Ref<string | undefined> = ref(undefined)
  const roomID: Ref<string | undefined> = ref('edsqdqs')

  return { username, roomID }
})

export default useStore