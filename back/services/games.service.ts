import { database } from '../firebase';

export const createGameService = async () => {
  return null;
};

export const playRoundService = async () => {
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
