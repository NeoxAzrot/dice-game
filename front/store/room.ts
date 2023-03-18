import { defineStore } from 'pinia';

type Game = {
  gameStatus: string;
  id: string;
};

type Room = {
  players: {
    id: string;
    username: string;
  }[];
  games: Game[];
};

const useRoomStore = defineStore('room', () => {
  const room: Ref<Room | undefined> = ref(undefined);

  return { room };
});

export default useRoomStore;
