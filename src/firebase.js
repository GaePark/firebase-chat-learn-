// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "react-chat-app-797cf.firebaseapp.com",
  projectId: "react-chat-app-797cf",
  databaseURL: import.meta.env.VITE_FIREBASE_DBURL,
  storageBucket: "react-chat-app-797cf.appspot.com",
  messagingSenderId: "627154118024",
  appId: "1:627154118024:web:2f41d7e095987100cdc63d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
export const storage = getStorage(app);

export default app;
