import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string);

const apps = getApps();

if (!apps.length) {
   initializeApp({
      credential: cert(serviceAccount),
   });
}

const db = getFirestore();

export { db };
