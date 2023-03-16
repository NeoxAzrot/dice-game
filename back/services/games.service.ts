import { GameTypes } from 'types/game';
import { GlobalTypes } from 'types/global';

import {
  GAME_STATUS,
  MAX_DICE,
  MAX_DICE_VALUE,
  MIN_DICE_VALUE,
  MIN_PLAYERS,
} from 'utils/constants';

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
      gameStatus: GAME_STATUS.WAITING,
      turn: null,
      rolls: 0,
    },
    dices: [],
    combinations: [],
  });

  await database
    .collection('rooms')
    .doc(roomId)
    .update({
      games: [...room.data()?.games, game.id],
    });

  return game;
};

export const getGamesService = async () => {
  const games = await database.collection('games').get();

  return games;
};

export const getGameByIdService = async (id: string) => {
  const game = await database.collection('games').doc(id).get();

  return game;
};

export const rollDicesService = async (dices: number) => {
  const newDices = [];

  for (let i = 0; i < dices; i++) {
    newDices.push(Math.floor(Math.random() * MAX_DICE_VALUE) + MIN_DICE_VALUE);
  }

  return newDices;
};

export const playRoundService = async ({
  gameId,
  move,
  userId,
  dicesKept = [],
}: GameTypes.PlayRound.Props) => {
  const updatedAt = new Date().toISOString();

  const game = await getGameByIdService(gameId);

  if (!game.exists) {
    return {
      success: false,
      message: 'Game not found',
    };
  }

  if (game.data()?.state.gameStatus !== GAME_STATUS.PLAYING) {
    return {
      success: false,
      message: 'Game not started',
    };
  }

  if (game.data()?.state.turn !== userId) {
    return {
      success: false,
      message: 'Not your turn',
    };
  }

  if (move === 'roll') {
    const dices = await rollDicesService(MAX_DICE - dicesKept.length);
    const combinations = [
      {
        name: '1',
        value: 1,
      },
    ];

    const newGame = await database
      .collection('games')
      .doc(gameId)
      .update({
        updatedAt,
        state: {
          ...game.data()?.state,
          rolls: game.data()?.state.rolls + 1,
        },
        dices,
        combinations,
      })
      .then(() => getGameByIdService(gameId));

    return {
      success: true,
      data: newGame.data(), // TODO: send only necessary data
    };
  } else if (move === 'hold') {
    if (dicesKept.length === 0) {
      return {
        success: false,
        message: 'Dices cannot be empty when holding',
      };
    }

    return {
      success: true,
      data: game.data(),
    };
  } else {
    return {
      success: false,
      message: 'Invalid move',
    };
  }
};

export const changePlayerReadyStatusService = async ({
  gameId,
  userId,
}: GameTypes.ChangePlayerReadyStatus.Props) => {
  const updatedAt = new Date().toISOString();

  const game = await getGameByIdService(gameId);

  if (!game.exists) {
    return {
      success: false,
      message: 'Game not found',
    };
  }

  if (game.data()?.state.gameStatus !== GAME_STATUS.WAITING) {
    return {
      success: false,
      message: 'Game already started',
    };
  }

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
    const newGameData = await database
      .collection('games')
      .doc(gameId)
      .update({
        updatedAt,
        state: {
          gameStatus: GAME_STATUS.PLAYING,
          turn: newGame.data()?.players[0].id,
        },
      })
      .then(() => getGameByIdService(gameId));

    return {
      success: true,
      data: {
        id: newGameData.id,
        state: {
          gameStatus: newGameData.data()?.state.gameStatus,
          turn: newGameData.data()?.state.turn,
        },
      },
    };
  }

  return {
    success: true,
    data: {
      id: newGame.id,
      state: {
        gameStatus: GAME_STATUS.WAITING,
      },
    },
  };
};
