import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.FB_API_KEY,
  authDomain: "zhzzk-36b49.firebaseapp.com",
  projectId: "zhzzk-36b49",
  storageBucket: "zhzzk-36b49.firebasestorage.app",
  messagingSenderId: "312975719986",
  appId: "1:312975719986:web:d1696d89be8d2c4d35462b",
  measurementId: "G-7L8CWJ5YN3"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);