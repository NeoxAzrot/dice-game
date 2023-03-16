import { defineStore } from 'pinia'

type Room = {
  createdAt: string,
  updatedAt: string,
  players: {
    id: string,
    username: string
  }[],
  games: string[],
}

const useRoomStore = defineStore('room', () => {
  const room: Ref<Room | undefined> = ref(undefined)

  return { room }
})

export default useRoomStore