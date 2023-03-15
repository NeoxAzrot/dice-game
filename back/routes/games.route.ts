import express from 'express';

import { getGames } from 'controllers/games.controller';

export const router = express.Router();

router.route('/').get(getGames);
