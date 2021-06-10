import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyAVg7LUAi8t7pwGJsq7QHcFkD4itTT9rpI",
  authDomain: "landekubura-abf41.firebaseapp.com",
  projectId: "landekubura-abf41",
  storageBucket: "landekubura-abf41.appspot.com",
  messagingSenderId: "842098726619",
  appId: "1:842098726619:web:121ad7d64c6f1286e0defe"
  // apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  // authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
};

try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error("Firebase initialization error", err.stack);
  }
}

export default firebase.firestore();
//export const firebase;
