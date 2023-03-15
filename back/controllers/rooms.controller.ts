import { Request, Response } from 'express';

import { createRoomService } from 'services/rooms.service';
import { getUserByUsernameService } from 'services/users.service';

export const createRoom = async (req: Request, res: Response) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ message: 'Missing username' });
  }

  const user = await getUserByUsernameService({ username });

  if (!user.id) {
    return res.status(400).json({ message: 'User not found' });
  }

  const room = await createRoomService({ userId: user.id as string });

  if (room.id) {
    return res.status(200).json({
      message: `New room created with id ${room.id}`,
      data: {
        id: room.id,
      },
    });
  } else {
    return res.status(400).json({
      message: 'Cannot create room',
    });
  }
};

export const joinRoom = (req: Request, res: Response) => {
  const roomId = req.params.id;

  return res.status(200).json({ message: `Get room #${roomId}` });
};

export const getRooms = (req: Request, res: Response) => {
  return res.status(200).json({ message: 'Get all rooms' });
};

export const getRoomById = (req: Request, res: Response) => {
  const roomId = req.params.id;

  return res.status(200).json({ message: `Get room #${roomId}` });
};

export const deleteRoomById = (req: Request, res: Response) => {
  const roomId = req.params.id;

  return res.status(200).json({ message: `Delete room #${roomId}` });
};
