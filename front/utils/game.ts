import { Combinaison } from '../interfaces/game';

export const getPairNumbers = (dices: number[]) => {
  let count = 0;
  const set = new Set();

  dices.forEach((dice) => {
    if (set.delete(dice)) {
      count += 1;
    } else {
      set.add(dice);
    }
  });

  return count;
};

export const getBankScore = (dices: number[], combinations: Combinaison[]) => {
  let score = 0;

  if (getPairNumbers(dices) === 3) {
    return getCombinationScore(dices, combinations);
  }

  if (
    dices.includes(1) &&
    dices.includes(2) &&
    dices.includes(3) &&
    dices.includes(4) &&
    dices.includes(5) &&
    dices.includes(6)
  ) {
    return getCombinationScore(dices, combinations);
  }

  for (let i = 1; i <= 6; i++) {
    const newDices = dices.filter((dice) => dice === i);

    score += getCombinationScore(newDices, combinations);
  }

  return score;
};

export const getCombinationScore = (
  dices: number[],
  combinations: Combinaison[]
) => {
  let score = 0;

  if (dices.length > 0) {
    const newCombination = combinations.find(
      (combination) =>
        combination.values.length === dices.length &&
        combination.values.every((value) => dices.includes(value))
    );

    if (newCombination) {
      score += newCombination.score;
    }
  }

  return score;
};
