import { GlobalTypes } from './global';

export namespace RoomTypes {
  export interface Firebase extends GlobalTypes.DefaultData {
    example: string;
  }

  export namespace Create {
    export interface Props {
      userId: string;
    }
  }

  export namespace Join {
    export interface Props {
      roomId: string;
      userId: string;
    }
  }
}
