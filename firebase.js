// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCziE8Q0r6TaoQLrlmbVl0Asg8BAYyFKyI",
  authDomain: "my-notes-d3556.firebaseapp.com",
  projectId: "my-notes-d3556",
  storageBucket: "my-notes-d3556.appspot.com",
  messagingSenderId: "1016085207610",
  appId: "1:1016085207610:web:78eb24672d2719c8953303",
  measurementId: "G-C4SGDHWDZH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app)
export const notesCollection = collection(db, "notes")