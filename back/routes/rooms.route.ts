import express from 'express';

import {
  createRoom,
  getRoomById,
  getRooms,
  joinRoom,
  removeUserFromRoom,
} from 'controllers/rooms.controller';

export const router = express.Router();

router.route('/').get(getRooms).post(createRoom);
router.route('/:id').get(getRoomById);
router.route('/:id/join').post(joinRoom);

router.route('/:roomId/users/:userId').put(removeUserFromRoom);
