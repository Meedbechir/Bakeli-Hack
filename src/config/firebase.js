import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyCT7ZwwLVfm6ah6Sev2r03b0dLNxhDFjCk",
    authDomain: "bakeli-hack.firebaseapp.com",
    projectId: "bakeli-hack",
    storageBucket: "bakeli-hack.appspot.com",
    messagingSenderId: "100516089753",
    appId: "1:100516089753:web:c8be53dc9a6fbcdd250d08"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); 

export { auth, db };
