
// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";

/**
 * Uses environment variables if present, otherwise you can paste your config object directly.
 * For Create React App use REACT_APP_... variables.
 */

const firebaseConfig = {
  apiKey: "AIzaSyDzRx2G7EVUCtxKQkGvNmc2M27zIi_-fww",
  authDomain: "riffrate-70f6a.firebaseapp.com",
  projectId: "riffrate-70f6a",
  storageBucket: "riffrate-70f6a.firebasestorage.app",
  messagingSenderId: "458853345328",
  appId: "1:458853345328:web:4b184d57868ccbe3b3a5f5",
  measurementId: "G-KJ60Q034EX"
};

// initialize app (singleton)
const app = initializeApp(firebaseConfig);

// exports you'll use throughout the app
export const db = getFirestore(app);
export const auth = getAuth(app);

/**
 * Helper to get a Firestore server timestamp for writes:
 * Use: created: serverTimestamp()
 */
export const getServerTimestamp = serverTimestamp;
