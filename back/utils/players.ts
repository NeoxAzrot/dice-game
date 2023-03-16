import { UserTypes } from 'types/user';

export namespace Players {
  export const getNext = ({ players, actualPlayerId }: UserTypes.Players.Props) => {
    const actualPlayerIndex = players.findIndex((player) => player.id === actualPlayerId);

    if (actualPlayerIndex === players.length - 1) {
      return players[0];
    }

    return players[actualPlayerIndex + 1];
  };
}
