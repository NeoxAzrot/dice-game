import { RoomTypes } from 'types/room';

import { MAX_PLAYERS } from 'utils/constants';

import { database } from '../firebase';

export const createRoomService = async ({ user }: RoomTypes.Create.Props) => {
  const createdAt = new Date().toISOString();
  const { id, username } = user;

  const room = await database.collection('rooms').add({
    createdAt,
    updatedAt: createdAt,
    players: [
      {
        id,
        username,
      },
    ],
  });

  return room;
};

export const joinRoomService = async ({ roomId, user }: RoomTypes.Join.Props) => {
  const updatedAt = new Date().toISOString();

  const room = await database.collection('rooms').doc(roomId).get();

  if (room.exists) {
    const players = room.data()?.players;

    if (players.length < MAX_PLAYERS) {
      if (players.includes(user.id)) {
        return {
          success: false,
          message: 'Cannot join room, user already in room',
          data: {
            id: room.id,
          },
        };
      }

      await database
        .collection('rooms')
        .doc(roomId)
        .update({
          updatedAt,
          players: [
            ...room.data()?.players,
            {
              id: user.id,
              username: user.username,
            },
          ],
        });
    } else {
      return {
        success: false,
        message: 'Cannot join room, max players reached',
        data: {
          id: room.id,
        },
      };
    }
  } else {
    return {
      success: false,
      message: 'Cannot join room, room not found',
      data: {
        id: room.id,
      },
    };
  }

  return {
    success: true,
    data: {
      id: room.id,
    },
  };
};

export const getRoomsService = async () => {
  const rooms = await database.collection('rooms').get();

  return rooms;
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

export const removeUserFromRoomService = async ({
  roomId,
  userId,
}: RoomTypes.RemoveUserFromRoom.Props) => {
  const room = await getRoomByIdService(roomId);

  if (room.exists) {
    const newRoom = await database
      .collection('rooms')
      .doc(roomId)
      .update({
        players: room.data()?.players.filter((player: { id: string }) => player.id !== userId),
      })
      .then(() => getRoomByIdService(roomId));

    if (newRoom.data()?.players.length === 0) {
      await deleteRoomByIdService(roomId);
    }
  }

  return room;
};
