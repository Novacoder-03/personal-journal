// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_lLtvwDCFzYI_jw3tYZruKfeqHeybqD0",
  authDomain: "personal-journal-2f7f7.firebaseapp.com",
  projectId: "personal-journal-2f7f7",
  storageBucket: "personal-journal-2f7f7.appspot.com",
  messagingSenderId: "441327866908",
  appId: "1:441327866908:web:95f79f670fb8aa4137fbd9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =getAuth(app)
export const provider =new GoogleAuthProvider()
export const db = getFirestore(app);

//firebase login
//firebase init
//firebase deploy
