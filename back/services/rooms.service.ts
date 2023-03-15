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

export const joinRoomService = async () => {
  return null;
};

export const getRoomsService = async () => {
  return null;
};

export const getRoomByIdService = async (id: string) => {
  const room = await database.collection('rooms').doc(id).get();

  return room;
};

export const deleteRoomByIdService = async (id: string) => {
  const room = await getRoomByIdService(id);

  if (room.exists) {
    await database.collection('rooms').doc(id).delete();
  }

  return room;
};
