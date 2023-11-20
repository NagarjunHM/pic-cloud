// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlRkknC5J8vehxmvC4M3RmWxUAPuQnuQc",

  authDomain: "piccloud-597d3.firebaseapp.com",

  projectId: "piccloud-597d3",

  storageBucket: "piccloud-597d3.appspot.com",

  messagingSenderId: "1084324161929",

  appId: "1:1084324161929:web:a56992c29ae61c1b649958",
};

//replace the above code block with your configuration

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
