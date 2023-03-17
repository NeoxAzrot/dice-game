import { Request, Response } from 'express';

import {
  createRoomService,
  getRoomByIdService,
  getRoomsService,
  joinRoomService,
  removeUserFromRoomService,
} from 'services/rooms.service';
import { getUserByUsernameService } from 'services/users.service';

export const createRoom = async (req: Request, res: Response) => {
  const { username, isPrivate } = req.body;

  if (!username) {
    return res.status(400).json({ success: false, message: 'Missing username' });
  }

  const user = await getUserByUsernameService(username);

  if (!user.id) {
    return res.status(400).json({ success: false, message: 'User not found' });
  }

  const room = await createRoomService({
    user: {
      id: user.id,
      username,
    },
    isPrivate,
  });

  if (!room.id) {
    return res.status(400).json({ success: false, message: 'Cannot create room' });
  }

  return res.status(200).json({
    success: true,
    data: {
      room: {
        id: room.id,
      },
      user: {
        id: user.id,
      },
    },
  });
};

export const joinRoom = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ success: false, message: 'Missing username' });
  }

  const user = await getUserByUsernameService(username);

  if (!user.id) {
    return res.status(400).json({ success: false, message: 'User not found' });
  }

  const room = await joinRoomService({
    roomId: id,
    user: {
      id: user.id,
      username,
    },
  });

  if (!room.success) {
    return res.status(400).json({
      success: false,
      message: room.message,
    });
  }

  return res.status(200).json({
    success: true,
    data: {
      room: {
        id: room.data.id,
      },
      user: {
        id: user.id,
      },
    },
  });
};

export const getRooms = async (req: Request, res: Response) => {
  const rooms = await getRoomsService();

  if (rooms.empty) {
    return res.status(400).json({ success: false, message: 'No rooms found' });
  }

  return res.status(200).json({
    success: true,
    data: {
      rooms: rooms.docs.map((room) => ({
        id: room.id,
      })),
    },
  });
};

export const getRoomById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const room = await getRoomByIdService(id);

  if (!room.exists) {
    return res.status(400).json({ success: false, message: 'Room not found' });
  }

  return res.status(200).json({
    success: true,
    data: {
      id: room.id,
      players: room.data()?.players,
    },
  });
};

export const removeUserFromRoom = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId } = req.body;

  const room = await removeUserFromRoomService({
    roomId: id,
    userId,
  });

  if (!room.exists) {
    return res.status(400).json({ success: false, message: 'Room not found' });
  }

  return res.status(200).json({ success: true });
};
