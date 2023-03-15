import { GlobalTypes } from './global';

export namespace RoomTypes {
  export interface Firebase extends GlobalTypes.DefaultData {
    example: string;
  }

  export namespace Create {
    export interface Props {
      userId: string;
    }

    // export interface Response {
    //   id: string;
    // }
  }
}
