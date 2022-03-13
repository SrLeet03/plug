import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

import { getDatabase, ref, onValue } from "firebase/database";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCWJ0VQZfl0RKaUBEpRvPfAWk43SQIH8CQ",
    authDomain: "plug-225c4.firebaseapp.com",
    projectId: "plug-225c4",
    storageBucket: "plug-225c4.appspot.com",
    messagingSenderId: "374842298165",
    appId: "1:374842298165:web:6120cc25941e011357067c",
    measurementId: "G-FY11FPN3G3"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
