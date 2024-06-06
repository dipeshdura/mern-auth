// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-8c49e.firebaseapp.com",
  projectId: "mern-auth-8c49e",
  storageBucket: "mern-auth-8c49e.appspot.com",
  messagingSenderId: "876371369718",
  appId: "1:876371369718:web:a8fdfe4fa65307cbb456d7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);