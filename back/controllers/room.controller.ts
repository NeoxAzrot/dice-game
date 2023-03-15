import { Request, Response } from 'express';

import { database } from '../firebase';

export const createRoom = (req: Request, res: Response) => {
  const { value, user } = req.body;
  const createdAt = new Date().toISOString();

  database.collection('rooms').add({
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

export const getRooms = (req: Request, res: Response) => {
  res.status(200).json({ message: 'Get all rooms' });
};

export const getRoomById = (req: Request, res: Response) => {
  const roomId = req.params.id;

  res.status(200).json({ message: `Get room #${roomId}` });
};

export const updateRoomById = (req: Request, res: Response) => {
  const roomId = req.params.id;

  res.status(200).json({ message: `Update room #${roomId}` });
};

export const deleteRoomById = (req: Request, res: Response) => {
  const roomId = req.params.id;

  res.status(200).json({ message: `Delete room #${roomId}` });
};
