import express from 'express';

import { getGameById, getGames } from 'controllers/games.controller';

export const router = express.Router();

router.route('/').get(getGames);
router.route('/:id').get(getGameById);
