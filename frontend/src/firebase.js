// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-41960.firebaseapp.com",
  projectId: "mern-auth-41960",
  storageBucket: "mern-auth-41960.firebasestorage.app",
  messagingSenderId: "381301733679",
  appId: "1:381301733679:web:3b7cfa60e4616c7fe689da"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);