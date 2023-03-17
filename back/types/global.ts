export namespace GlobalTypes {
  interface Combination {
    name: string;
    values: number[];
    score: number;
  }
  export interface DefaultData {
    createdAt: Date;
    updatedAt?: Date;
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

  export interface GetScoreProps {
    combinations: Combination[];
    dices: number[];
  }
}
