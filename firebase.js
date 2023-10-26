// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAXHV7chfUZfexzw9EVn_lTjIF0KfgFLvU",
  authDomain: "my-notes-bdbc9.firebaseapp.com",
  projectId: "my-notes-bdbc9",
  storageBucket: "my-notes-bdbc9.appspot.com",
  messagingSenderId: "87987197603",
  appId: "1:87987197603:web:425846783f357b74041116",
  measurementId: "G-WYVFKTY2CY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app)
export const notesCollection = collection(db, "notes")