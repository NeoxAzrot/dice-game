import { GlobalTypes } from 'types/global';

import { Arrays } from './arrays';
import {
  DICE_VALUE_TO_POINTS,
  DICE_VALUE_TO_POINTS_WITH_FULL_RUN_BONUS,
  DICE_VALUE_TO_POINTS_WITH_QUADRUPLE_BONUS,
  DICE_VALUE_TO_POINTS_WITH_QUINTUPLE_BONUS,
  DICE_VALUE_TO_POINTS_WITH_SEXTUPLE_BONUS,
  DICE_VALUE_TO_POINTS_WITH_THREE_PAIRS_BONUS,
  DICE_VALUE_TO_POINTS_WITH_TRIPLE_BONUS,
  MAX_DICE_VALUE,
} from './constants';

export namespace Games {
  const getPairNumbers = (dices: number[]) => {
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

  export const getCombinations = (dices: number[]) => {
    const response: GlobalTypes.CombinationsResponse = {
      dices: [],
      combinations: [],
    };

    if (getPairNumbers(dices) === 3) {
      response.dices = dices.map((dice) => ({
        value: dice,
        isLocked: false,
      }));

      response.combinations.push({
        name: 'Three pairs',
        values: dices.map((dice) => dice),
        score: DICE_VALUE_TO_POINTS_WITH_THREE_PAIRS_BONUS,
      });
    }

    if (
      dices.includes(1) &&
      dices.includes(2) &&
      dices.includes(3) &&
      dices.includes(4) &&
      dices.includes(5) &&
      dices.includes(6)
    ) {
      response.dices = dices.map((dice) => ({
        value: dice,
        isLocked: false,
      }));

      response.combinations.push({
        name: 'Full run',
        values: [1, 2, 3, 4, 5, 6],
        score: DICE_VALUE_TO_POINTS_WITH_FULL_RUN_BONUS,
      });
    }

    for (let i = 1; i <= MAX_DICE_VALUE; i++) {
      const newDices = dices.filter((dice) => dice === i);

      if (newDices.length > 0) {
        if (response.dices.length !== MAX_DICE_VALUE) {
          if (DICE_VALUE_TO_POINTS[newDices[0] as keyof typeof DICE_VALUE_TO_POINTS] !== 0) {
            response.dices.push(
              ...newDices.map((dice) => ({
                value: dice,
                isLocked: false,
              })),
            );
          } else {
            if (newDices.length < 3) {
              response.dices.push(
                ...newDices.map((dice) => ({
                  value: dice,
                  isLocked: true,
                })),
              );
            } else {
              response.dices.push(
                ...newDices.map((dice) => ({
                  value: dice,
                  isLocked: false,
                })),
              );
            }
          }
        }

        newDices.map((dice, index) => {
          if (index === 0) {
            response.combinations.push({
              name: `Single of ${dice}`,
              values: [dice],
              score: DICE_VALUE_TO_POINTS[dice as keyof typeof DICE_VALUE_TO_POINTS],
            });
          } else if (index === 1) {
            response.combinations.push({
              name: `Double of ${dice}`,
              values: [dice, dice],
              score: DICE_VALUE_TO_POINTS[dice as keyof typeof DICE_VALUE_TO_POINTS] * 2,
            });
          } else if (index === 2) {
            response.combinations.push({
              name: `Triple of ${dice}`,
              values: [dice, dice, dice],
              score:
                DICE_VALUE_TO_POINTS_WITH_TRIPLE_BONUS[
                  dice as keyof typeof DICE_VALUE_TO_POINTS_WITH_TRIPLE_BONUS
                ],
            });
          } else if (index === 3) {
            response.combinations.push({
              name: `Quadruple of ${dice}`,
              values: [dice, dice, dice, dice],
              score:
                DICE_VALUE_TO_POINTS_WITH_QUADRUPLE_BONUS[
                  dice as keyof typeof DICE_VALUE_TO_POINTS_WITH_QUADRUPLE_BONUS
                ],
            });
          } else if (index === 4) {
            response.combinations.push({
              name: `Quintuple of ${dice}`,
              values: [dice, dice, dice, dice, dice],
              score: DICE_VALUE_TO_POINTS_WITH_QUINTUPLE_BONUS,
            });
          } else if (index === 5) {
            response.combinations.push({
              name: `Sextuple of ${dice}`,
              values: [dice, dice, dice, dice, dice, dice],
              score: DICE_VALUE_TO_POINTS_WITH_SEXTUPLE_BONUS,
            });
          }
        });
      }
    }

    return {
      dices: Arrays.shuffle(response.dices),
      combinations: response.combinations,
    };
  };
}
