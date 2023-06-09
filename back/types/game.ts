export namespace GameTypes {
  export namespace Create {
    export interface Props {
      roomId: string;
      userId: string;
    }
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

  export namespace GamesByRoomId {
    export interface Props {
      id: string;
      gameStatus: string;
      winner: string;
      createdAt: number;
    }

    export interface Response {
      id: string;
      winner: {
        id: string;
        username: string;
      };
    }
  }
}
