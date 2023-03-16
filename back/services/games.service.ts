import { GlobalTypes } from 'types/global';

import { database } from '../firebase';

export const createGameService = async (roomId: string) => {
  const createdAt = new Date().toISOString();

  const room = await database.collection('rooms').doc(roomId).get();

  const game = await database.collection('games').add({
    createdAt,
    updatedAt: createdAt,
    roomId,
    players: room.data()?.players.map((player: GlobalTypes.Player) => ({
      id: player.id,
      username: player.username,
      score: 0,
      isReady: false,
    })),
    winner: null,
    state: {
      turn: null,
      isPlaying: false,
    },
  });

  return game;
};

export const playRoundService = async () => {
  const updatedAt = new Date().toISOString();

  return null;
};

export const getGamesService = async () => {
  const games = await database.collection('games').get();

  return games;
};

export const getGameByIdService = async (id: string) => {
  const game = await database.collection('games').doc(id).get();

  return game;
};
