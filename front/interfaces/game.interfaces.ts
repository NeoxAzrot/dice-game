export interface Combinaison {
  name: string,
  score: number,
  values: number[]
}

export interface Dice {
  value: number,
  isLocked: boolean
}

export interface ListDice {
  board: Dice[],
  bank: Dice[]
}