import { initializeApp } from 'firebase/app';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const firebaseConfig = {
    // remplace les valeurs par config.VARIABLE
    apiKey: config.FIREBASE_API_KEY,
    authDomain: config.FIREBASE_AUTH_DOMAIN,
    projectId: config.FIREBASE_PROJECT_ID,
    storageBucket: config.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: config.FIREBASE_MESSAGING_SENDER_ID,
    appId: config.FIREBASE_APP_ID
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const listen = async (collection: string, document: string, type: 'room' | 'game') => {
    let firstTime = false
    const unsubscribe = onSnapshot(doc(db, collection, document), async (req: any) => {
      if (type === 'room') useRoom().room.value = req.data();
      if (type === 'game') useGame().value = req.data();
      if (!firstTime) {
        await useRoom().fetchNames()
        firstTime = true
      }
    });

    return { unsubscribe }
  }

  return {
    provide: {
      firebase: {
        app, db, listen
      }
    }
  }
})