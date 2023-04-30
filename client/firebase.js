import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDoGyLCESXkiktsAtucAnyto7z89o69mBU",
  authDomain: "game-catalog-5d71a.firebaseapp.com",
  projectId: "game-catalog-5d71a",
  storageBucket: "game-catalog-5d71a.appspot.com",
  messagingSenderId: "443196981071",
  appId: "1:443196981071:web:34f64e237f1553ecfd8f3a",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
