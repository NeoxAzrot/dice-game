import { UserTypes } from 'types/user';

import { database } from '../firebase';

export const createUserService = async ({ username }: UserTypes.Create.Props) => {
  const createdAt = new Date().toISOString();

  const user = await database.collection('users').add({
    username,
    createdAt,
    updatedAt: createdAt,
  });

  return user;
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
