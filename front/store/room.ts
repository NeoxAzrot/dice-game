import { defineStore } from 'pinia'

const useRoomStore = defineStore('room', () => {
  const room: Ref<Object | undefined> = ref(undefined)

  return { room }
})

export default useRoomStore