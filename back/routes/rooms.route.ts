import express from 'express';

import {
  createRoom,
  deleteRoomById,
  getRoomById,
  getRooms,
  updateRoomById,
} from '../controllers/rooms.controller';

export const router = express.Router();

router.route('/').get(getRooms).post(createRoom);
router.route('/:id').get(getRoomById).put(updateRoomById).delete(deleteRoomById);
