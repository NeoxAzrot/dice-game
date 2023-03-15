import { Request, Response } from 'express';

import { database } from '../firebase';

export const createGame = (req: Request, res: Response) => {
  const { value, user } = req.body;
  const createdAt = new Date().toISOString();

  database.collection('games').add({
    createdAt,
  });

  if (value && user) {
    res.status(200).json({
      message: `Create a new room at ${createdAt} with the value ${value} for ${user}`,
    });
  } else {
    res.status(400).json({ message: 'Missing value or user' });
  }
};

export const playRound = (req: Request, res: Response) => {
  const gameId = req.params.id;

  res.status(200).json({ message: `Get room #${gameId}` });
};

export const getGames = (req: Request, res: Response) => {
  res.status(200).json({ message: 'Get all games' });
};
