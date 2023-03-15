import express from 'express';
import {
  createRoom,
  getRooms,
  getRoomById,
  updateRoomById,
  deleteRoomById,
} from '../controllers/rooms.controller.js';

export const router = express.Router();

router.route('/').get(getRooms).post(createRoom);
router
  .route('/:id')
  .get(getRoomById)
  .put(updateRoomById)
  .delete(deleteRoomById);
