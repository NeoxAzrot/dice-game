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
  const createdAt = new Date().getTime();
  const room = await getRoomByIdService(roomId);

  const game = await database.collection('games').add({
    roomId,
    players: room.data()?.players.map((player: GlobalTypes.Player) => ({
      id: player.id,
      username: player.username,
      score: 0,
      isReady: player.id === userId,
      reaction: null,
    })),
    roundScore: 0,
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
      games: [
        ...room.data()?.games,
        {
          id: game.id,
          gameStatus: GAME_STATUS.WAITING,
          createdAt,
          startedAt: null,
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
        games: [
          ...user.data()?.games,
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

    const canPlay = newDices.some((dice: { isLocked: boolean }) => {
      return !dice.isLocked;
    });

    const newGame = await database
      .collection('games')
      .doc(gameId)
      .update({
        state: {
          ...game.data()?.state,
          turn: canPlay
            ? userId
            : Players.getNext({ players: game.data()?.players, actualPlayerId: userId }).id,
        },
        roundScore: canPlay ? game.data()?.roundScore : 0,
        dices: canPlay ? newDices : [],
        combinations: canPlay ? combinations : [],
        bank: canPlay
          ? game.data()?.bank.map((item: { isLocked: boolean }) => {
              return {
                ...item,
                isLocked: true,
              };
            })
          : [],
      })
      .then(() => getGameByIdService(gameId));

    return {
      success: true,
      data: newGame.data(),
    };
  } else if (move === 'hold') {
    const roundScore = game.data()?.roundScore;

    if (roundScore === 0) {
      return {
        success: false,
        message: 'You cannot hold without any points',
      };
    }

    const userScore = game.data()?.players.find((player: GlobalTypes.Player) => {
      return player.id === userId;
    })?.score;

    const newScore = userScore + roundScore;
    const isWinner = newScore >= MAX_SCORE;

    const nextPlayer = Players.getNext({
      players: game.data()?.players,
      actualPlayerId: userId,
    });

    const newGame = await database
      .collection('games')
      .doc(gameId)
      .update({
        players: game.data()?.players.map((player: GlobalTypes.Player) => {
          if (player.id === userId) {
            return {
              ...player,
              score: newScore,
            };
          }

          return player;
        }),
        roundScore: 0,
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
      const room = await getRoomByIdService(game.data()?.roomId);

      await database
        .collection('rooms')
        .doc(newGame.data()?.roomId)
        .update({
          games: room.data()?.games.map((item: { id: string }) => {
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
      players,
    })
    .then(() => getGameByIdService(gameId));

  if (newGame.data()?.players.every((player: GlobalTypes.Player) => player.isReady)) {
    const startedAt = new Date().getTime();

    const newGameData = await database
      .collection('games')
      .doc(gameId)
      .update({
        state: {
          gameStatus: GAME_STATUS.PLAYING,
          turn: newGame.data()?.players[Numbers.getRandom(0, newGame.data()?.players.length - 1)]
            .id,
        },
      })
      .then(() => getGameByIdService(gameId));

    const room = await getRoomByIdService(game.data()?.roomId);

    await database
      .collection('rooms')
      .doc(game.data()?.roomId)
      .update({
        games: room.data()?.games.map((item: { id: string }) => {
          if (item.id === gameId) {
            return {
              ...item,
              gameStatus: GAME_STATUS.PLAYING,
            };
          }

          return item;
        }),
        state: {
          ...room.data()?.state,
          isPlaying: true,
          startedAt,
        },
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
