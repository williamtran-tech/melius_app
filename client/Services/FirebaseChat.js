import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  apiKeyFB,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
} from "@env";

const firebaseConfig = {
  apiKey: apiKeyFB,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
  measurementId: measurementId,
};

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
