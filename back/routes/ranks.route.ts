import express from 'express';

import { getRanks } from 'controllers/ranks.controller';

export const router = express.Router();

router.route('/').get(getRanks);
