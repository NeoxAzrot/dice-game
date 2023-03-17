import { Combinaison } from '../interfaces/game.interfaces';

export const getScore = (dices: number[], combinations: Combinaison[]) => {
  let score = 0;

  for (let i = 1; i <= 6; i++) {
    const newDices = dices.filter((dice) => dice === i);

    if (newDices.length > 0) {
      const newCombination = combinations.find(
        (combination) =>
          combination.values.length === newDices.length &&
          combination.values.every((value) => newDices.includes(value)),
      );

      if (newCombination) {
        score += newCombination.score;
      }
    }
  }

  return score;
};
