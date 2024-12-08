import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.FB_API_KEY,
  authDomain: "zhzzk-36b49.firebaseapp.com",
  databaseURL: "https://zhzzk-36b49-default-rtdb.firebaseio.com",
  projectId: "zhzzk-36b49",
  storageBucket: "zhzzk-36b49.firebasestorage.app",
  messagingSenderId: "312975719986",
  appId: "1:312975719986:web:d1696d89be8d2c4d35462b",
  measurementId: "G-7L8CWJ5YN3"
};

// database
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

// firestore
const firestore = getFirestore(app);
export const firebaseDB = firestore;

// export const auth = getAuth(app);       // for 인증
// export const storage = getStorage(app); // for 스토리지
// export const db = getFirestore(app);    // for 데이터베이스