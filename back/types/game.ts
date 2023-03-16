import { GlobalTypes } from './global';

export namespace GameTypes {
  export interface Firebase extends GlobalTypes.DefaultData {
    example: string;
  }

  export namespace ChangePlayerReadyStatus {
    export interface Props {
      gameId: string;
      userId: string;
    }
  }

  export namespace PlayRound {
    export interface Props {
      gameId: string;
      move: 'roll' | 'hold';
      userId: string;
      dicesKept?: number[];
    }
  }
}
