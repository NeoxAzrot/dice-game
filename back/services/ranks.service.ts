import { RankTypes } from 'types/rank';

import { getUsersService } from './users.service';

export const getRanksService = async () => {
  const users = await getUsersService();

  const ranks = users.docs.map((user) => {
    const { username, games } = user.data();

    if (!games) {
      return {
        username,
        wins: 0,
        allGames: 0,
        winRate: 0,
      };
    }

    const wins = games.filter((game: RankTypes.Game.Props) => game.winner === user.id).length;
    const allGames = games.length;

    return {
      id: user.id,
      username,
      wins,
      allGames,
      winRate: wins / allGames,
    };
  });

  const sortedRanks = ranks.sort((a, b) => {
    const aWinRate = a.winRate;
    const bWinRate = b.winRate;

    const aWins = a.wins;
    const bWins = b.wins;

    const aUsername = a.username;
    const bUsername = b.username;

    if (aWinRate !== bWinRate) {
      return bWinRate - aWinRate;
    } else if (aWins !== bWins) {
      return bWins - aWins;
    } else {
      return aUsername.localeCompare(bUsername);
    }
  });

  return sortedRanks;
};
