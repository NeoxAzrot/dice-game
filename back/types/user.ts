import { GlobalTypes } from './global';

export namespace UserTypes {
  export namespace Create {
    export interface Props {
      username: string;
    }
  }

  export namespace Players {
    export interface Props {
      players: GlobalTypes.Player[];
      actualPlayerId: string;
    }
  }
}
