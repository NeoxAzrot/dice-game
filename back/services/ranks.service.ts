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

    const wins = games.filter((game: RankTypes.Game.Props) => game.isWinner).length;
    const allGames = games.length;

    const winRate = (wins / allGames || 0) * 100;

    return {
      id: user.id,
      username,
      wins,
      allGames,
      winRate: Number(winRate.toFixed(2)),
    };
  });

  const sortedRanks = ranks.sort((a, b) => {
    const aWinRate = a.winRate;
    const bWinRate = b.winRate;

    const aWins = a.wins;
    const bWins = b.wins;

    const aAllGames = a.allGames;
    const bAllGames = b.allGames;

    const aUsername = a.username;
    const bUsername = b.username;

    if (aWinRate !== bWinRate) {
      return bWinRate - aWinRate;
    } else if (aWins !== bWins) {
      return bWins - aWins;
    } else if (aAllGames !== bAllGames) {
      return bAllGames - aAllGames;
    } else {
      return aUsername.localeCompare(bUsername);
    }
  });

  return sortedRanks;
};
