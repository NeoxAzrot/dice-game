import { Request, Response } from 'express';

import { getUserByIdService } from 'services/users.service';

export const getUserById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = await getUserByIdService(id);

  if (!user.exists) {
    return res.status(400).json({ success: false, message: 'User not found' });
  }

  return res.status(200).json({
    success: true,
    data: {
      id: user.id,
      username: user.data()?.username,
    },
  });
};
