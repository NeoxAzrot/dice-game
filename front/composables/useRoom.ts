import { storeToRefs } from 'pinia';
import useRoomStore from '~~/store/room';

interface JoinOrCreateRoom {
  success: boolean;
  message?: string;
  data: {
    room: {
      id: string;
    };
    user: {
      id: string;
    };
  };
}

export default function useRoom() {
  const { API_ENDPOINT: endpoint } = useRuntimeConfig().public;
  const { username } = useStore();

  const { room } = storeToRefs(useRoomStore());

  const join: (ID: string) => Promise<JoinOrCreateRoom> = (ID: string) => {
    return $fetch(endpoint + `/rooms/${ID}/join`, {
      method: 'POST',
      body: JSON.stringify({ username: username.value }),
    });
  };

  const create: (isPrivate: boolean) => Promise<JoinOrCreateRoom> = (
    isPrivate: boolean
  ) => {
    return $fetch(endpoint + '/rooms', {
      method: 'POST',
      body: JSON.stringify({ username: username.value, isPrivate: isPrivate }),
    });
  };

  const verify = (ID: string) => {
    return $fetch(endpoint + `/rooms/${ID}`, {
      method: 'GET',
    });
  };

  const leave = () => {
    return $fetch(endpoint + `/rooms/${useRoute().params.room}`, {
      method: 'DELETE',
      body: JSON.stringify({ userId: useCookie('dice-game-user-id').value }),
    });
  };

  const listAll: () => Promise<any> = () => {
    return $fetch(endpoint + `/rooms`, {
      method: 'GET',
    });
  };

  const getGames: () => Promise<any> = () => {
    return $fetch(endpoint + `/rooms/${useRoute().params.room}/games`, {
      method: 'GET',
    });
  };

  return { room, join, create, verify, leave, listAll, getGames };
}
