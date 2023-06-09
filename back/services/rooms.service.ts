import { GlobalTypes } from 'types/global';
import { RoomTypes } from 'types/room';

import { MAX_PLAYERS } from 'utils/constants';

import { database } from '../firebase';

export const createRoomService = async ({ user, isPrivate }: RoomTypes.Create.Props) => {
  const { id, username } = user;

  const room = await database.collection('rooms').add({
    players: [
      {
        id,
        username,
      },
    ],
    state: {
      isPlaying: false,
    },
    games: [],
    settings: {
      isPrivate: isPrivate || false,
    },
  });

  return room;
};

export const joinRoomService = async ({ roomId, user }: RoomTypes.Join.Props) => {
  const room = await database.collection('rooms').doc(roomId).get();

  if (room.exists) {
    if (room.data()?.state.isPlaying) {
      return {
        success: false,
        message: 'Cannot join room, game is already in progress',
        data: {
          id: room.id,
        },
      };
    }

    const players = room.data()?.players;

    if (players.length < MAX_PLAYERS) {
      if (players.find((player: GlobalTypes.Player) => player.id === user.id)) {
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
  const rooms = await database
    .collection('rooms')
    .where('settings.isPrivate', '==', false)
    .where('state.isPlaying', '==', false)
    .get();

  const sortedRooms = rooms.docs.sort((a, b) => {
    const aPlayers = a.data().players.length;
    const bPlayers = b.data().players.length;

    const aCreatedAt = a.createTime.seconds;
    const bCreatedAt = b.createTime.seconds;

    if (aPlayers === bPlayers) {
      return aCreatedAt - bCreatedAt;
    }

    return aPlayers - bPlayers;
  });

  return sortedRooms;
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
        players: room.data()?.players.filter((player: GlobalTypes.Player) => player.id !== userId),
      })
      .then(() => getRoomByIdService(roomId));

    if (newRoom.data()?.players.length === 0) {
      await deleteRoomByIdService(roomId);
    }
  }

  return room;
};
