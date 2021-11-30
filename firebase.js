// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// import { GoogleAuthProvider } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBx3FDbPuvJ2fOe90C6DXnhaqnsiLYf5jE",
  authDomain: "insta-2-nextjs.firebaseapp.com",
  projectId: "insta-2-nextjs",
  storageBucket: "insta-2-nextjs.appspot.com",
  messagingSenderId: "135764984708",
  appId: "1:135764984708:web:a5f9349b6bf786842893d1",
  measurementId: "G-QB6X1H55YC"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore()
const storage = getStorage();
const analytics = getAnalytics(app);

export { app, db, storage }