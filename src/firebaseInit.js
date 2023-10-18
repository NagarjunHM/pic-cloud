// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8ZZDe_cgf0CFfai8yVoYqYd3A-gTN0Zs",
  authDomain: "photofolio-app-6437f.firebaseapp.com",
  projectId: "photofolio-app-6437f",
  storageBucket: "photofolio-app-6437f.appspot.com",
  messagingSenderId: "768019087405",
  appId: "1:768019087405:web:df6481b6e5a811e1ce78a4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
