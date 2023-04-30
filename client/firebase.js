import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCa2kKyK72UwXkS4CteP9zR2w42u4_wJNI",
  authDomain: "personal-website-872a5.firebaseapp.com",
  projectId: "personal-website-872a5",
  storageBucket: "personal-website-872a5.appspot.com",
  messagingSenderId: "574950819709",
  appId: "1:574950819709:web:26f95e6be3880163a86e14",
  measurementId: "G-0K5PPS825B",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
