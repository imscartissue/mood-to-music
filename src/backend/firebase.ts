// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMnG-KMDYdmk3HfY8JbFFQvwFQglD5df0",
  authDomain: "moodtomusic-98969.firebaseapp.com",
  projectId: "moodtomusic-98969",
  storageBucket: "moodtomusic-98969.firebasestorage.app",
  messagingSenderId: "155825614323",
  appId: "1:155825614323:web:b71fcb87f51e4acb8fb686",
  measurementId: "G-GMMGTKD3ZP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app); 
export { db };

// const analytics = getAnalytics(app);