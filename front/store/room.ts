import { defineStore } from 'pinia'

const useRoomStore = defineStore('room', () => {
  const room: Ref<any | undefined> = ref(undefined)

  return { room }
})

export default useRoomStore