import { Combinaison } from '../interfaces/game.interfaces';

export const getBankScore = (dices: number[], combinations: Combinaison[]) => {
  let score = 0;

  for (let i = 1; i <= 6; i++) {
    const newDices = dices.filter((dice) => dice === i);
    
    score += getCombinationScore(newDices, combinations);
  }

  return score;
};

export const getCombinationScore = (dices: number[], combinations: Combinaison[]) => {
  let score = 0;

  if (dices.length > 0) {
    const newCombination = combinations.find(
      (combination) =>
        combination.values.length === dices.length &&
        combination.values.every((value) => dices.includes(value)),
    );

    if (newCombination) {
      score += newCombination.score;
    }
  }

  return score;
};