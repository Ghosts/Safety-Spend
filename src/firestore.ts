import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export const config = {
  databaseURL: "",
  apiKey: "AIzaSyBA2jRug5NJGdtkCA2oYfFVRHOZvKY6TEg",
  authDomain: "week-budget.firebaseapp.com",
  projectId: "week-budget",
  storageBucket: "week-budget.appspot.com",
  messagingSenderId: "1005237651276",
  appId: "1:1005237651276:web:9f04db6dccd83c867471e9",
  measurementId: "G-2S8WVRFZBN",
};

export const app = initializeApp(config);
export const db = getFirestore(app);
