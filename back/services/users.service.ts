import { UserTypes } from 'types/user';

import { database } from '../firebase';

export const createUserService = async ({ username }: UserTypes.Create.Props) => {
  const user = await database.collection('users').add({
    username,
    games: [],
  });

  return user;
};

export const getUsersService = async () => {
  const users = await database.collection('users').get();

  return users;
};

export const getUserByUsernameService = async (username: string) => {
  const user = await database.collection('users').where('username', '==', username).get();
  let userId = null;

  if (user.empty) {
    const createUser = await createUserService({ username });
    userId = createUser.id;
  } else {
    userId = user.docs[0].id;
  }

  return { id: userId };
};

export const getUserByIdService = async (id: string) => {
  const user = await database.collection('users').doc(id).get();

  return user;
};
