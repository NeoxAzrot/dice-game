import { defineStore } from 'pinia';

type Game = {
  gameStatus: string;
  id: string;
  createdAt: string;
};

type Room = {
  settings: {
    isPrivate: boolean;
  };
  players: {
    id: string;
    username: string;
    isReady: boolean;
  }[];
  games: Game[];
};

const useRoomStore = defineStore('room', () => {
  const room: Ref<Room | undefined> = ref(undefined);

  return { room };
});

export default useRoomStore;
