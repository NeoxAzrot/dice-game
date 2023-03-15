import { UserTypes } from 'types/user';

import { database } from '../firebase';

export const createUserService = async ({ username }: UserTypes.Create.Props) => {
  const createdAt = new Date().toISOString();

  const user = await database.collection('users').add({
    username,
    createdAt,
    updatedAt: createdAt,
  });

  return user.id;
};

export const getUserByUsernameService = async (username: string) => {
  const user = await database.collection('users').where('username', '==', username).get();
  let userId = null;

  if (user.empty) {
    userId = await createUserService({ username });
  } else {
    userId = user.docs[0].id;
  }

  return { id: userId };
};
