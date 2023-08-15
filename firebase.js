import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCyODxerovFUUEOVvVMyO_S3GCSNrWmHhI",
  authDomain: "note-it-221fb.firebaseapp.com",
  projectId: "note-it-221fb",
  storageBucket: "note-it-221fb.appspot.com",
  messagingSenderId: "608613287700",
  appId: "1:608613287700:web:69328b414573054e856401",
  measurementId: "G-JNDK7RE20G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app)
export const notesCollection = collection(db, "notes")