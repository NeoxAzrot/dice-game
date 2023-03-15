import { Request, Response } from 'express';

import {
  createRoomService,
  deleteRoomByIdService,
  getRoomByIdService,
  joinRoomService,
} from 'services/rooms.service';
import { getUserByUsernameService } from 'services/users.service';

export const createRoom = async (req: Request, res: Response) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ success: false, message: 'Missing username' });
  }

  const user = await getUserByUsernameService(username);

  if (!user.id) {
    return res.status(400).json({ success: false, message: 'User not found' });
  }

  const room = await createRoomService({ userId: user.id });

  if (!room.id) {
    return res.status(400).json({ success: false, message: 'Cannot create room' });
  }

  return res.status(200).json({
    success: true,
    data: {
      id: room.id,
    },
  });
};

export const joinRoom = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ success: false, message: 'Missing username' });
  }

  const user = await getUserByUsernameService(username);

  if (!user.id) {
    return res.status(400).json({ success: false, message: 'User not found' });
  }

  const room = await joinRoomService({ roomId: id, userId: user.id });

  if (!room.success) {
    return res.status(400).json({
      success: false,
      message: room.message,
    });
  }

  return res.status(200).json({
    success: true,
    data: {
      id: room.data.id,
    },
  });
};

export const getRooms = async (req: Request, res: Response) => {
  return res.status(200).json({ success: true });
};

export const getRoomById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const room = await getRoomByIdService(id);

  if (!room.exists) {
    return res.status(400).json({ success: false, message: 'Room not found' });
  }

  return res.status(200).json({
    success: true,
    data: {
      id: room.id,
    },
  });
};

export const deleteRoomById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const room = await deleteRoomByIdService(id);

  if (!room.exists) {
    return res.status(400).json({ success: false, message: 'Room not found' });
  }

  return res.status(200).json({ success: true });
};
