// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAj7L-umrD8e0VXLVxnvznibYvDtqLTq6w",
  authDomain: "jobxie-81726.firebaseapp.com",
  projectId: "jobxie-81726",
  storageBucket: "jobxie-81726.appspot.com",
  messagingSenderId: "854647831039",
  appId: "1:854647831039:web:fce824d31a597cc1550fca",
  measurementId: "G-0G9DRR7ZZ3"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
