import { GlobalTypes } from 'types/global';

import { Arrays } from './arrays';
import { DICE_VALUE_TO_POINTS, MAX_DICE_VALUE } from './constants';

export namespace Games {
  export const getCombinations = (dices: number[]) => {
    const response: GlobalTypes.CombinationsResponse = {
      dices: [],
      combinations: [],
    };

    console.log(dices);

    for (let i = 1; i <= MAX_DICE_VALUE; i++) {
      const newDices = dices.filter((dice) => dice === i);

      if (newDices.length > 0) {
        const scoringDiceValues = Object.keys(DICE_VALUE_TO_POINTS);
        const diceValue = newDices[0];

        if (scoringDiceValues.includes(diceValue.toString())) {
          response.dices.push(
            ...newDices.map((dice) => ({
              value: dice,
              isLocked: false,
            })),
          );

          response.combinations.push({
            name: `${diceValue} of a kind`,
            value: DICE_VALUE_TO_POINTS[diceValue as keyof typeof DICE_VALUE_TO_POINTS],
          });
        } else {
          if (newDices.length >= 3) {
            response.combinations.push({
              name: 'Three of a kind',
              value: i * 3,
            });

            response.dices.push(
              ...newDices.map((dice) => ({
                value: dice,
                isLocked: false,
              })),
            );
          } else {
            response.dices.push(
              ...newDices.map((dice) => ({
                value: dice,
                isLocked: true,
              })),
            );
          }
        }
      }
    }

    console.log(response);

    return {
      dices: Arrays.shuffle(response.dices),
      combinations: response.combinations,
    };
  };
}
