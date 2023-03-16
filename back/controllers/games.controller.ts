import { Request, Response } from 'express';

import {
  changePlayerReadyStatusService,
  createGameService,
  getGameByIdService,
  getGamesService,
  playRoundService,
} from 'services/games.service';

export const createGame = async (req: Request, res: Response) => {
  const { roomId } = req.body;

  const game = await createGameService(roomId);

  if (!game.id) {
    return res.status(400).json({ success: false, message: 'Cannot create game' });
  }

  return res.status(200).json({
    success: true,
    data: {
      id: game.id,
    },
  });
};

export const playRound = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { move, userId, dicesKept } = req.body;

  const game = await playRoundService({ gameId: id, move, userId, dicesKept });

  if (!game.success) {
    return res.status(400).json({ success: game.success, message: game.message });
  }

  return res.status(200).json({ success: true, data: game.data });
};

export const getGames = async (req: Request, res: Response) => {
  const games = await getGamesService();

  if (games.empty) {
    return res.status(400).json({ success: false, message: 'No games found' });
  }

  return res.status(200).json({
    success: true,
    data: {
      games: games.docs.map((game) => ({
        id: game.id,
      })),
    },
  });
};

export const getGameById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const game = await getGameByIdService(id);

  if (!game.exists) {
    return res.status(400).json({ success: false, message: 'Game not found' });
  }

  return res.status(200).json({
    success: true,
    data: {
      id: game.id,
    },
  });
};

export const changePlayerReadyStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId } = req.body;

  const game = await changePlayerReadyStatusService({ gameId: id, userId });

  if (!game.success) {
    return res.status(400).json({ success: game.success, message: game.message });
  }

  return res.status(200).json({ success: true, data: game.data });
};
