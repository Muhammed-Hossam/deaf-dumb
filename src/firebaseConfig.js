// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9HYF9LZOqzn1F8mFQJ4DXJ2V5-V5u_1E",
  authDomain: "deaf-dumb-80b19.firebaseapp.com",
  projectId: "deaf-dumb-80b19",
  storageBucket: "deaf-dumb-80b19.appspot.com",
  messagingSenderId: "270544255585",
  appId: "1:270544255585:web:52ffc14550ea04e1534820"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;