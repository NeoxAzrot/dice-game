import { UserTypes } from 'types/user';

import { database } from '../firebase';
import { getGameByIdService } from './games.service';

export const createUserService = async ({ username }: UserTypes.Create.Props) => {
  const user = await database.collection('users').add({
    username,
    games: [],
  });

  return user;
};

export const getUsersService = async () => {
  const users = await database.collection('users').get();

  return users;
};

export const getUserByUsernameService = async (username: string) => {
  const user = await database.collection('users').where('username', '==', username).get();
  let userId = null;

  if (user.empty) {
    const createUser = await createUserService({ username });
    userId = createUser.id;
  } else {
    userId = user.docs[0].id;
  }

  return { id: userId };
};

export const getUserByIdService = async (id: string) => {
  const user = await database.collection('users').doc(id).get();

  return user;
};

export const getUsersWinByRoomIdService = async (room: any) => {
  const games: any[] = [];

  for (const game of room.data()?.games) {
    if (game.gameStatus === 'finished') {
      const newGame = await getGameByIdService(game.id);

      for (const player of newGame.data()?.players) {
        if (player.id === newGame.data()?.winner) {
          if (games.find((g) => g.id === player.id)) {
            games.find((g) => g.id === player.id).wins += 1;
          } else {
            games.push({
              id: player.id,
              username: player.username,
              wins: 1,
            });
          }
        }
      }
    }
  }

  return games;
};
