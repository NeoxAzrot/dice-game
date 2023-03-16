import { GameTypes } from 'types/game';
import { GlobalTypes } from 'types/global';

import { MAX_PLAYERS, MIN_PLAYERS } from 'utils/constants';

import { database } from '../firebase';
import { getRoomByIdService } from './rooms.service';

export const createGameService = async (roomId: string) => {
  const createdAt = new Date().toISOString();

  const room = await getRoomByIdService(roomId);

  const game = await database.collection('games').add({
    createdAt,
    updatedAt: createdAt,
    roomId,
    players: room.data()?.players.map((player: GlobalTypes.Player) => ({
      id: player.id,
      username: player.username,
      score: 0,
      displayScore: 0,
      isReady: false,
    })),
    winner: null,
    state: {
      isPlaying: false,
      turn: null,
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

export const changePlayerReadyStatusService = async ({
  gameId,
  userId,
}: GameTypes.ChangePlayerReadyStatus.Props) => {
  const updatedAt = new Date().toISOString();

  const game = await getGameByIdService(gameId);

  const players = game.data()?.players.map((player: GlobalTypes.Player) => ({
    ...player,
    isReady: player.id === userId ? !player.isReady : player.isReady,
  }));

  if (!players) {
    return {
      success: false,
      message: 'Cannot change player ready status',
    };
  }

  if (players.length < MIN_PLAYERS) {
    return {
      success: false,
      message: 'Minimum 2 players required',
    };
  }

  const newGame = await database
    .collection('games')
    .doc(gameId)
    .update({
      updatedAt,
      players,
    })
    .then(() => getGameByIdService(gameId));

  if (newGame.data()?.players.every((player: GlobalTypes.Player) => player.isReady)) {
    await database
      .collection('games')
      .doc(gameId)
      .update({
        updatedAt,
        state: {
          isPlaying: true,
          turn: newGame.data()?.players[0].id,
        },
      })
      .then(() => getGameByIdService(gameId));

    return {
      success: true,
      data: {
        id: newGame.id,
        state: {
          isPlaying: true,
          turn: newGame.data()?.players[0].id,
        },
      },
    };
  }

  return {
    success: true,
    data: {
      id: newGame.id,
      state: {
        isPlaying: false,
      },
    },
  };
};
