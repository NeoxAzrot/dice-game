import { defineStore } from 'pinia';

const useGlobalStore = defineStore('global', () => {
  const username: Ref<string | undefined> = ref(undefined);
  const roomID: Ref<string | undefined> = ref(undefined);
  const userID: Ref<string | null> = ref(useCookie('dice-game-user-id').value);

  return { username, roomID, userID };
});

export default useGlobalStore;
