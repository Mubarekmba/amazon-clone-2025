// Import Firebase core
import { initializeApp } from "firebase/app";

// Import Firebase services
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWbSrjvEz49ceOTVJw6QLP-D0AYUwyI_w",
  authDomain: "clone-e126f.firebaseapp.com",
  projectId: "clone-e126f",
  storageBucket: "clone-e126f.firebasestorage.app",
  messagingSenderId: "301162736630",
  appId: "1:301162736630:web:6df4463c4e58d9e090f5d7",
};

// ✅ CREATE THE APP
const app = initializeApp(firebaseConfig);

// ✅ EXPORT SERVICES
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;

//rules_version = '2';

// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /{document=**} {
//       allow read, write: if false;
//     }
//   }
// }
