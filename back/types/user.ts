import { GlobalTypes } from './global';

export namespace UserTypes {
  export interface Firebase extends GlobalTypes.DefaultData {
    username: string;
  }

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
