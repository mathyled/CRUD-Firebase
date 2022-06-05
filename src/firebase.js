// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCR22F_ZJjxWZMO4yWi0SLCwiwxeCbUJRI",
  authDomain: "fb-crud-react-f6d26.firebaseapp.com",
  projectId: "fb-crud-react-f6d26",
  storageBucket: "fb-crud-react-f6d26.appspot.com",
  messagingSenderId: "156766052556",
  appId: "1:156766052556:web:d11268313a3d5de46fe269"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);