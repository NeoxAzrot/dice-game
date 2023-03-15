import { Request, Response } from 'express';

import { createRoomService, getRoomByIdService } from 'services/rooms.service';
import { getUserByUsernameService } from 'services/users.service';

export const createRoom = async (req: Request, res: Response) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ message: 'Missing username' });
  }

  const user = await getUserByUsernameService(username);

  if (!user.id) {
    return res.status(400).json({ message: 'User not found' });
  }

  const room = await createRoomService({ userId: user.id });

  if (!room.id) {
    return res.status(400).json({
      message: 'Cannot create room',
    });
  }

  return res.status(200).json({
    message: `Create room #${room.id}`,
    data: {
      id: room.id,
    },
  });
};

export const joinRoom = async (req: Request, res: Response) => {
  const roomId = req.params.id;

  return res.status(200).json({ message: `Get room #${roomId}` });
};

export const getRooms = async (req: Request, res: Response) => {
  return res.status(200).json({ message: 'Get all rooms' });
};

export const getRoomById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const room = await getRoomByIdService(id);

  if (!room.exists) {
    return res.status(400).json({ message: 'Room not found' });
  }

  return res.status(200).json({ message: `Get room #${id}`, data: room.data() });
};

export const deleteRoomById = async (req: Request, res: Response) => {
  const id = req.params.id;

  return res.status(200).json({ message: `Delete room #${id}` });
};
