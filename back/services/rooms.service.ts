import { RoomTypes } from 'types/room';

import { database } from '../firebase';

export const createRoomService = async ({ userId }: RoomTypes.Create.Props) => {
  const createdAt = new Date().toISOString();

  const room = await database.collection('rooms').add({
    createdAt,
    updatedAt: createdAt,
    players: [userId],
  });
  // .then((docRef) => {
  //   return {
  //     message: `New room created with id ${docRef.id}`,
  //     id: docRef.id,
  //   };
  // })
  // .catch((error) => {
  //   return { message: 'Cannot create room', error };
  // });

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
