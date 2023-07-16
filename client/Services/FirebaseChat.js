import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAG3niip6oTtV0meMOg9I3bFXeSGIWyTBo",
  authDomain: "meliuschat.firebaseapp.com",
  projectId: "meliuschat",
  storageBucket: "meliuschat.appspot.com",
  messagingSenderId: "64291811987",
  appId: "1:64291811987:web:431e05ef6ff2508ce79366",
  measurementId: "G-DZHRMH64RJ",
};

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
