import { GameTypes } from 'types/game';
import { GlobalTypes } from 'types/global';

import {
  GAME_STATUS,
  MAX_DICE,
  MAX_DICE_VALUE,
  MAX_SCORE,
  MIN_DICE_VALUE,
  MIN_PLAYERS,
} from 'utils/constants';
import { Games } from 'utils/games';
import { Numbers } from 'utils/numbers';
import { Players } from 'utils/players';

import { database } from '../firebase';
import { getRoomByIdService } from './rooms.service';

export const createGameService = async ({ roomId, userId }: GameTypes.Create.Props) => {
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
      isReady: player.id === userId,
    })),
    winner: null,
    state: {
      gameStatus: GAME_STATUS.WAITING,
      turn: null,
    },
    dices: [],
    bank: [],
    combinations: [],
  });

  await database
    .collection('rooms')
    .doc(roomId)
    .update({
      updatedAt: createdAt,
      games: [
        ...room.data()?.games,
        {
          id: game.id,
          gameStatus: GAME_STATUS.WAITING,
        },
      ],
    });

  const users = await database
    .collection('users')
    .where(
      'username',
      'in',
      room.data()?.players.map((player: GlobalTypes.Player) => player.username),
    )
    .get();

  users.forEach(async (user) => {
    database
      .collection('users')
      .doc(user.id)
      .update({
        updatedAt: createdAt,
        games: [
          ...room.data()?.games,
          {
            id: game.id,
            winner: null,
          },
        ],
      });
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
    newDices.push(Numbers.getRandom(MIN_DICE_VALUE, MAX_DICE_VALUE));
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
    const { dices: newDices, combinations } = Games.getCombinations(dices);

    const newGame = await database
      .collection('games')
      .doc(gameId)
      .update({
        updatedAt,
        state: {
          ...game.data()?.state,
        },
        dices: newDices,
        bank: [...dicesKept],
        combinations,
      })
      .then(() => getGameByIdService(gameId));

    return {
      success: true,
      data: newGame.data(),
    };
  } else if (move === 'hold') {
    if (dicesKept.length === 0) {
      return {
        success: false,
        message: 'Dices cannot be empty when holding',
      };
    }

    const isDiceInvalid = dicesKept.some((dice: number) => {
      return dice < MIN_DICE_VALUE || dice > MAX_DICE_VALUE;
    });

    if (isDiceInvalid) {
      return {
        success: false,
        message: 'Invalid dice value',
      };
    }

    const score = game.data()?.displayScore;
    const isWinner = score >= MAX_SCORE;

    const nextPlayer = Players.getNext({
      players: game.data()?.players,
      actualPlayerId: userId,
    });

    const newGame = await database
      .collection('games')
      .doc(gameId)
      .update({
        updatedAt,
        players: game.data()?.players.map((player: GlobalTypes.Player) => {
          if (player.id === userId) {
            return {
              ...player,
              score: player.score + score,
              displayScore: player.score + score,
            };
          }

          return player;
        }),
        winner: isWinner ? userId : null,
        state: {
          ...game.data()?.state,
          gameStatus: isWinner ? GAME_STATUS.FINISHED : GAME_STATUS.PLAYING,
          turn: isWinner ? null : nextPlayer.id,
        },
        dices: [],
        bank: [],
        combinations: [],
      })
      .then(() => getGameByIdService(gameId));

    if (isWinner) {
      await database
        .collection('rooms')
        .doc(newGame.data()?.roomId)
        .update({
          updatedAt,
          games: newGame.data()?.games.map((item: { id: string }) => {
            if (item.id === gameId) {
              return {
                ...item,
                gameStatus: GAME_STATUS.FINISHED,
              };
            }

            return item;
          }),
        });

      await database
        .collection('users')
        .doc(userId)
        .update({
          updatedAt,
          games: newGame.data()?.players.map((item: { id: string }) => {
            if (item.id === gameId) {
              return {
                ...item,
                winner: userId,
              };
            }

            return item;
          }),
        });
    }

    return {
      success: true,
      data: newGame.data(),
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
          turn: newGame.data()?.players[Numbers.getRandom(0, newGame.data()?.players.length - 1)]
            .id,
        },
      })
      .then(() => getGameByIdService(gameId));

    await database
      .collection('rooms')
      .doc(game.data()?.roomId)
      .update({
        updatedAt,
        games: newGameData.data()?.games.map((item: { id: string }) => {
          if (item.id === gameId) {
            return {
              ...item,
              gameStatus: GAME_STATUS.PLAYING,
            };
          }

          return item;
        }),
      });

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
