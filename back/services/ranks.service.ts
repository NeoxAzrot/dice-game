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

    // TODO: just id, not winner status
    const wins = games.filter((game: RankTypes.Game.Props) => game.winner === user.id).length;
    const allGames = games.length;

    return {
      username,
      wins,
      allGames,
      winRate: wins / allGames,
    };
  });

  return ranks;
};
