import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Replace with your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKqjyE0XRcILGOzLtfgdJ8xq8C1Phbb54",
  authDomain: "moscow-life.firebaseapp.com",
  projectId: "moscow-life",
  storageBucket: "moscow-life.firebasestorage.app",
  messagingSenderId: "891810655027",
  appId: "1:891810655027:web:bffde48bf5d066b331ac46",
  measurementId: "G-M4K0520CNQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);