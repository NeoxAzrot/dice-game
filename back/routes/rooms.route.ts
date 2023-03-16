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
router.route('/:id').get(getRoomById).delete(removeUserFromRoom);
router.route('/:id/join').post(joinRoom);
