// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnsOtHofuJn6CXzyaQuCN9AetpMZMy7Tk",
  authDomain: "bawkcipes.firebaseapp.com",
  projectId: "bawkcipes",
  storageBucket: "bawkcipes.appspot.com",
  messagingSenderId: "1059133058903",
  appId: "1:1059133058903:web:c253e3f2b94f9410c75812",
  measurementId: "G-92JGV3QC26",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const storage = getStorage(app);

export default db;
