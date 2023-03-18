export namespace RoomTypes {
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
