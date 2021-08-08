// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyB2eNbqpWof7quecBXbU9r9Drfs3whQJI0",
    authDomain: "challenge-dae8b.firebaseapp.com",
    projectId: "challenge-dae8b",
    storageBucket: "challenge-dae8b.appspot.com",
    messagingSenderId: "946189363102",
    appId: "1:946189363102:web:e7164b4e8c90cf8d18d88f",
    measurementId: "G-VXFQF5KLJV"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export {db,auth};