import { Request, Response } from 'express';

export const createGame = (req: Request, res: Response) => {
  const createdAt = new Date().toISOString();

  return res.status(200).json({
    message: `Create a new room at ${createdAt}`,
  });
};

export const playRound = (req: Request, res: Response) => {
  const gameId = req.params.id;

  return res.status(200).json({ message: `Get room #${gameId}` });
};

export const getGames = (req: Request, res: Response) => {
  return res.status(200).json({ message: 'Get all games' });
};

export const getGameById = (req: Request, res: Response) => {
  const gameId = req.params.id;

  return res.status(200).json({ message: `Get game #${gameId}` });
};
