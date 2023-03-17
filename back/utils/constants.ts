export const MIN_PLAYERS = 2;
export const MAX_PLAYERS = 2;

export const MAX_SCORE = 1000;
export const MAX_DICE = 6;

export const MIN_DICE_VALUE = 1;
export const MAX_DICE_VALUE = 6;

export const DICE_VALUE_TO_POINTS = {
  1: 100,
  2: 0,
  3: 0,
  4: 0,
  5: 50,
  6: 0,
};

export const DICE_VALUE_TO_POINTS_WITH_TRIPLE_BONUS = {
  1: 1000,
  2: 200,
  3: 300,
  4: 400,
  5: 500,
  6: 600,
};

export const DICE_VALUE_TO_POINTS_WITH_QUADRUPLE_BONUS = {
  1: 1100,
  2: 1000,
  3: 1000,
  4: 1000,
  5: 1000,
  6: 1000,
};

export const DICE_VALUE_TO_POINTS_WITH_QUINTUPLE_BONUS = 2000;

export const DICE_VALUE_TO_POINTS_WITH_SEXTUPLE_BONUS = 3000;

export const GAME_STATUS = {
  WAITING: 'waiting',
  PLAYING: 'playing',
  FINISHED: 'finished',
};
