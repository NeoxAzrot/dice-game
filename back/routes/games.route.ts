import express from 'express';

import { createGame, getGameById, getGames, playRound } from 'controllers/games.controller';

export const router = express.Router();

router.route('/').get(getGames);
router.route('/:id').get(getGameById);

router.route('/rooms/:roomId').post(createGame);
router.route(':id/play').post(playRound);
