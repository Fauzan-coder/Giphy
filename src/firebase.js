// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCyeJTLzgb9iyH1FilcfqQKVHuLYzjlvUY",
  authDomain: "giphy-ca5eb.firebaseapp.com",
  projectId: "giphy-ca5eb",
  storageBucket: "giphy-ca5eb.appspot.com",
  messagingSenderId: "20327139815",
  appId: "1:20327139815:web:457b6ea5d9641a77189542",
  measurementId: "G-F7JFE2DS48"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth instance
export const auth = getAuth(app);
