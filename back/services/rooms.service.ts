import { RoomTypes } from 'types/room';

import { database } from '../firebase';

export const createRoomService = async ({ userId }: RoomTypes.Create.Props) => {
  const createdAt = new Date().toISOString();

  const room = await database.collection('rooms').add({
    createdAt,
    updatedAt: createdAt,
    players: [userId],
  });

  return {
    id: room.id,
  };
};

export const joinRoomService = () => {
  return null;
};

export const getRoomsService = () => {
  return null;
};

export const deleteRoomByIdService = () => {
  return null;
};
