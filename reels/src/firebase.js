import firebase from "firebase/app";

import "firebase/firestore";

// Step 1 
import "firebase/auth";

// for storing data files videos
import "firebase/storage";

var firebaseConfig = {
    apiKey: "AIzaSyCu0b-kqdEKLnHJANqnYuo1m0apwpLvAH8",
    authDomain: "reels-e6e1a.firebaseapp.com",
    projectId: "reels-e6e1a",
    storageBucket: "reels-e6e1a.appspot.com",
    messagingSenderId: "376708860296",
    appId: "1:376708860296:web:e50feeeaa65a13545f123d"
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

export const storage = firebase.storage(); // to store videos

// Step 2
export const auth = firebase.auth(); // authication object 

// Step 3 -> firebase console; enable google login in auth panel

// Step 4
let provider = new firebase.auth.GoogleAuthProvider(); // provider bata raha hai konsi servies use kara gai authentication ka lia


export const signInWithGoogle = () => auth.signInWithPopup(provider); // // sign in karna hai popup ka sath google kaa

export default firebase;