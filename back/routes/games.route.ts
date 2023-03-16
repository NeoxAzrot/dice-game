import express from 'express';

import {
  changePlayerReadyStatus,
  createGame,
  getGameById,
  getGames,
  playRound,
} from 'controllers/games.controller';

export const router = express.Router();

router.route('/').get(getGames).post(createGame);
router.route('/:id').get(getGameById);

router.route('/:id/play').post(playRound);
router.route('/:id/ready').post(changePlayerReadyStatus);
