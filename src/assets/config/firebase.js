// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth , GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDop4sUZlyBfEXHN704KRrv9N4dLXtTPlU",
  authDomain: "foodproject-4cc8a.firebaseapp.com",
  projectId: "foodproject-4cc8a",
  storageBucket: "foodproject-4cc8a.appspot.com",
  messagingSenderId: "804704033219",
  appId: "1:804704033219:web:4887724d3b8a7b132b4576",
  measurementId: "G-50H4XYLFJ1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
 const auth = getAuth(app);
const provider = new GoogleAuthProvider()
export  {auth , provider ,firebaseConfig};
