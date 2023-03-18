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
      username,
      wins,
      allGames,
      winRate: wins / allGames,
    };
  });

  const sortedRanks = ranks.sort(
    (a, b) => b.winRate - a.winRate || b.wins - a.wins || a.username - b.username,
  );

  console.log(sortedRanks);

  return sortedRanks;
};
