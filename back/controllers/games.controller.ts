import { Request, Response } from 'express';

import { createGameService, getGameByIdService, getGamesService } from 'services/games.service';

export const createGame = async (req: Request, res: Response) => {
  const { roomId } = req.params;

  const game = await createGameService(roomId);

  if (!game.id) {
    return res.status(400).json({ success: false, message: 'Cannot create game' });
  }

  return res.status(200).json({
    succes: true,
    data: {
      id: game.id,
    },
  });
};

export const playRound = async (req: Request, res: Response) => {
  const { id } = req.params;

  return res.status(200).json({ succes: true });
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
    succes: true,
    data: {
      id: game.id,
    },
  });
};
