import { GlobalTypes } from './global';

export namespace RoomTypes {
  export interface Firebase extends GlobalTypes.DefaultData {
    example: string;
  }

  export namespace Create {
    export interface Props {
      user: GlobalTypes.Player;
    }
  }

  export namespace Join {
    export interface Props {
      roomId: string;
      user: GlobalTypes.Player;
    }
  }

  export namespace RemoveUserFromRoom {
    export interface Props {
      roomId: string;
      userId: string;
    }
  }
}
