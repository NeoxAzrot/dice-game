import { database } from '../firebase';

export const createGameService = async () => {
  return null;
};

export const playRoundService = async () => {
  return null;
};

export const getGamesService = async () => {
  return null;
};

export const getGameByIdService = async (id: string) => {
  const game = await database.collection('games').doc(id).get();

  return game;
};
