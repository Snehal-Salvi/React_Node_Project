// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
 
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "fir-app-59a2e.firebaseapp.com",
  projectId: "fir-app-59a2e",
  storageBucket: "fir-app-59a2e.appspot.com",
  messagingSenderId: "970651523715",
  appId: "1:970651523715:web:35e4ddbd93186b436bd9b6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
