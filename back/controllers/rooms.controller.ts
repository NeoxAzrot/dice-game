import { Request, Response } from 'express';

import { createRoomService } from 'services/rooms.service';
import { getUserByUsernameService } from 'services/users.service';

export const createRoom = async (req: Request, res: Response) => {
  const { username } = req.body;

  const user = await getUserByUsernameService({ username });

  if (user.error) {
    res.status(400).json({ message: 'Missing username' });
  }

  const room = await createRoomService({ userId: user.id as string });

  if (room.id) {
    res.status(200).json({
      message: `New room created with id ${room.id}`,
      data: {
        id: room.id,
      },
    });
  } else {
    res.status(400).json({
      message: 'Cannot create room',
    });
  }
};

export const joinRoom = (req: Request, res: Response) => {
  const roomId = req.params.id;

  res.status(200).json({ message: `Get room #${roomId}` });
};

export const getRooms = (req: Request, res: Response) => {
  res.status(200).json({ message: 'Get all rooms' });
};

export const deleteRoomById = (req: Request, res: Response) => {
  const roomId = req.params.id;

  res.status(200).json({ message: `Delete room #${roomId}` });
};
