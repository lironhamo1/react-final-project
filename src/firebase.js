// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCblcWg_3cedLjc9_OgKS8llX4DnQFqrpc",
  authDomain: "react-final-pro-b31f6.firebaseapp.com",
  projectId: "react-final-pro-b31f6",
  storageBucket: "react-final-pro-b31f6.appspot.com",
  messagingSenderId: "855452549778",
  appId: "1:855452549778:web:134cac1e783befffcedc4b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db=getFirestore(app)

export default db