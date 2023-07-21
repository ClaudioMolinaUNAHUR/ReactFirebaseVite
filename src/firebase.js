
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBFfwkUTBNM-fQOqGSrbeQoN5fTIqEZz2k",
  authDomain: "react-firebase-7f408.firebaseapp.com",
  projectId: "react-firebase-7f408",
  storageBucket: "react-firebase-7f408.appspot.com",
  messagingSenderId: "168449605676",
  appId: "1:168449605676:web:cda84823da4de17bcb1189"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// inicializar autenticacion
const auth = getAuth(app);

export {auth};