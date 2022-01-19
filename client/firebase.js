import { initializeApp, getApps, getApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC2L8r33qS1w23NnzpDmhbTHkDx72JG3AQ",
  authDomain: "photostop-c2eae.firebaseapp.com",
  projectId: "photostop-c2eae",
  storageBucket: "photostop-c2eae.appspot.com",
  messagingSenderId: "876632398091",
  appId: "1:876632398091:web:65236feefe4d8241f86a0e",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const storage = getStorage();

export { app, storage };
