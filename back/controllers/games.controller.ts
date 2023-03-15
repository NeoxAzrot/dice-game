import { Request, Response } from 'express';

import { getGameByIdService } from 'services/games.service';

export const createGame = async (req: Request, res: Response) => {
  const createdAt = new Date().toISOString();

  return res.status(200).json({ succes: true });
};

export const playRound = async (req: Request, res: Response) => {
  const gameId = req.params.id;

  return res.status(200).json({ succes: true });
};

export const getGames = async (req: Request, res: Response) => {
  return res.status(200).json({ succes: true });
};

export const getGameById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const game = await getGameByIdService(id);

  if (!game.exists) {
    return res.status(400).json({ success: false, message: 'Game not found' });
  }

  return res.status(200).json({
    succes: true,
    data: {
      data: {
        id: game.id,
      },
    },
  });
};
