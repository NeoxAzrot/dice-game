import { Request, Response } from 'express';

import { getRanksService } from 'services/ranks.service';

export const getRanks = async (req: Request, res: Response) => {
  const ranks = await getRanksService();

  if (ranks.length <= 0) {
    return res.status(200).json({ success: false, message: 'No ranks found', data: [] });
  }

  return res.status(200).json({
    success: true,
    data: {
      ranks: ranks.map((rank) => ({
        username: rank.username,
        wins: rank.wins,
        allGames: rank.allGames,
        winRate: rank.winRate,
      })),
    },
  });
};
