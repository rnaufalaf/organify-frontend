import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBdVa0b-peQVOnd8wqOeg1YBHHeCmMPGt8",
  authDomain: "rn-organify.firebaseapp.com",
  databaseURL: "https://rn-organify-default-rtdb.firebaseio.com",
  projectId: "rn-organify",
  storageBucket: "rn-organify.appspot.com",
  messagingSenderId: "416181154545",
  appId: "1:416181154545:web:9ca9b71b758ab36322af50",
  measurementId: "G-0V4LZ70FZY",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
