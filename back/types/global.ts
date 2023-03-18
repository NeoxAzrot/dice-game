export namespace GlobalTypes {
  interface Combination {
    name: string;
    values: number[];
    score: number;
  }

  export interface Player {
    id: string;
    username: string;
    score: number;
    displayScore: number;
    isReady: boolean;
  }

  export interface CombinationsResponse {
    combinations: Combination[];
    dices: {
      value: number;
      isLocked: boolean;
    }[];
  }
}
