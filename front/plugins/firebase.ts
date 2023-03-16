import { initializeApp } from 'firebase/app';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const firebaseConfig = {
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
    let firstTime = true

    const unsubscribe = onSnapshot(doc(db, collection, document), async (req: any) => {
      if (type === 'room') useRoom().room.value = req.data();
      if (type === 'game') useGame().value = req.data();
      if (firstTime) {
        if (!req.data().players.some((player: any) => player.id === useCookie('dice-game-user-id').value)) {
          navigateTo('/')
        }
        firstTime = false
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