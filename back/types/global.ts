export namespace GlobalTypes {
  export interface DefaultData {
    createdAt: Date;
    updatedAt?: Date;
  }

  export interface Player {
    id: string;
    username: string;
    isReady?: boolean;
  }
}
