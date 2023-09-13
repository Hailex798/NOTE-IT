// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBjgZCejmhyfL_RD0meHqJTELIt8sfFUX0",
  authDomain: "my-note-it-79dda.firebaseapp.com",
  projectId: "my-note-it",
  storageBucket: "my-note-it.appspot.com",
  messagingSenderId: "51461462774",
  appId: "1:51461462774:web:6b756d85c9d929f55f2ad7",
  measurementId: "G-E103B4MXXH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app)
export const notesCollection = collection(db, "notes")