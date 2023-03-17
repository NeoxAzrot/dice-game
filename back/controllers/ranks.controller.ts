import { Request, Response } from 'express';

import { getRanksService } from 'services/ranks.service';

export const getRanks = async (req: Request, res: Response) => {
  const ranks = await getRanksService();

  if (ranks.length <= 0) {
    return res.status(400).json({ success: false, message: 'No ranks found' });
  }

  return res.status(200).json({
    success: true,
    data: {
      ranks: ranks
        .sort((a, b) => b.winRate - a.winRate)
        .map((rank) => ({
          username: rank.username,
          wins: rank.wins,
          allGames: rank.allGames,
          winRate: rank.winRate,
        })),
    },
  });
};
