//import * as firebase from "firebase/app";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyACf130jnv_mYX-eS8ZaEKpKSYe0tAg0tA",
    authDomain: "travycomsats.firebaseapp.com",
    databaseURL: "https://travycomsats.firebaseio.com",
    projectId: "travycomsats",
    storageBucket: "travycomsats.appspot.com",
    messagingSenderId: "3416567928",
    appId: "1:3416567928:web:abf19a8fbdd6a20fc03d8d"
  };

firebase.initializeApp(firebaseConfig);
// firebase.firestore().settings({
//   timestampsInSnapshots: true
// })

//firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
const firestore = firebase.firestore();
const auth = firebase.auth();


// firebaseGoogleSignIn=firebase
//     .auth()
//     .signInWithPopup(new firebase.auth.GoogleAuthProvider())
//     .then(async result => {})
//     .catch(err => {});

// export const storageKey = 'KEY_FOR_LOCAL_STORAGE';

// export const isAuthenticated = () => {
//   return !!auth.currentUser || !!localStorage.getItem(storageKey);
// };


export { firebase, firestore };
// export const myFirestore = firebase.firestore();
// export const myStorage = firebase.storage();