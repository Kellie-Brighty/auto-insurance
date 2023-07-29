import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCFc_4uFAubxoihLKhVUTOpou5oI3fj3Vs",
  authDomain: "autoflex-c2ce9.firebaseapp.com",
  projectId: "autoflex-c2ce9",
  storageBucket: "autoflex-c2ce9.appspot.com",
  messagingSenderId: "1041358156108",
  appId: "1:1041358156108:web:db59ebb2523237e97fdfe9",
  measurementId: "G-7LLBKHXNJC",
};

const firebase = initializeApp(firebaseConfig);
export const fbStorage = getStorage(firebase);

export default firebase;
