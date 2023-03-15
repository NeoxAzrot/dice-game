import * as dotenv from 'dotenv';
import firebase, { ServiceAccount } from 'firebase-admin';

dotenv.config();

const firebaseConfig: ServiceAccount = {
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n') || '',
  projectId: process.env.FIREBASE_PROJECT_ID,
};

firebase.initializeApp({
  credential: firebase.credential.cert(firebaseConfig),
});

export default firebase.firestore();
