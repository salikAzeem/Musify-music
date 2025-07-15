// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCVzIOUNmbumkhP1D7fEKUHyD4pvZYWDtw",
  authDomain: "musify-music.firebaseapp.com",
  projectId: "musify-music",
  storageBucket: "musify-music.appspot.com",
  messagingSenderId: "340711295275",
  appId: "1:340711295275:web:e4880298871e252a2a9d6e",
  measurementId: "G-RV0QM3Q8LK"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
