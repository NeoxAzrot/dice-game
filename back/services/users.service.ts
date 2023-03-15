import { UserTypes } from 'types/user';

import { database } from '../firebase';

export const createUserService = async ({ username }: UserTypes.Create.Props) => {
  const createdAt = new Date().toISOString();

  const user = await database
    .collection('users')
    .add({
      username,
      createdAt,
      updatedAt: createdAt,
    })
    .then((docRef) => {
      return { id: docRef.id };
    })
    .catch((error) => {
      return { message: 'Cannot create user', error };
    });

  return user;
};

export const getUserByUsernameService = async ({ username }: UserTypes.GetByUsername.Props) => {
  const user = await database.collection('users').where('username', '==', username).get();
  let userId = null;

  if (user.empty) {
    userId = await createUserService({ username });
  } else {
    userId = user.docs[0].id;
  }

  if (userId === null) return { error: 'User not found' };

  return { id: userId };
};
