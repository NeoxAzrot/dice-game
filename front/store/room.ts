import { defineStore } from 'pinia'

const useRoomStore = defineStore('room', () => {
  const room: Ref<any | undefined> = ref(undefined)
  const users: Ref<string[] | undefined> = ref(undefined)

  return { room, users }
})

export default useRoomStore