import express from 'express';

import { createGame, playRound } from 'controllers/games.controller';
import { createRoom, deleteRoomById, getRooms, joinRoom } from 'controllers/rooms.controller';

export const router = express.Router();

router.route('/').get(getRooms).post(createRoom);
router.route('/:id').delete(deleteRoomById);
router.route('/:id/join').post(joinRoom);

router.route('/:roomId/games').post(createGame);
router.route('/:roomId/games/:gameId/play').post(playRound);
