import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import 'firebase/compat/auth'

const firebaseConfig = {
    apiKey: "AIzaSyClb58WHHo-LsU4g9L4cJ5RsnI5gO1nZT0",
    authDomain: "reelrush-fbd63.firebaseapp.com",
    projectId: "reelrush-fbd63",
    storageBucket: "reelrush-fbd63.appspot.com",
    messagingSenderId: "38679285955",
    appId: "1:38679285955:web:95c4394b01252162355276"
  };


firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

export { storage, firebase as default }

