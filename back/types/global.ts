export namespace GlobalTypes {
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
    combinations: {
      name: string;
      value: number;
    }[];
    dices: {
      value: number;
      isLocked: boolean;
    }[];
  }
}
