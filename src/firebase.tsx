import firebase from "firebase/app";
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCOLpwChj8NOoFxErPorg7pkcoVda1oA0w",
    authDomain: "todo300-aa92a.firebaseapp.com",
    projectId: "todo300-aa92a",
    storageBucket: "todo300-aa92a.appspot.com",
    messagingSenderId: "884506178957",
    appId: "1:884506178957:web:3f68938a223abf9c02f9c4"
  };
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

// data base
const db = fb.firestore();

export { db, firebase };
