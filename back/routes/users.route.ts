import express from 'express';

import { getUserById } from 'controllers/users.controller';

export const router = express.Router();

router.route('/:id').get(getUserById);
