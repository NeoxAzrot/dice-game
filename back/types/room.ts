import { GlobalTypes } from './global';

export namespace RoomTypes {
  export interface Firebase extends GlobalTypes.DefaultData {
    example: string;
  }

  export namespace Create {
    export interface Props {
      user: {
        id: string;
        username: string;
      };
      isPrivate: boolean;
    }
  }

  export namespace Join {
    export interface Props {
      roomId: string;
      user: {
        id: string;
        username: string;
      };
    }
  }

  export namespace RemoveUserFromRoom {
    export interface Props {
      roomId: string;
      userId: string;
    }
  }
}
