import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC7dKQKFZrILaC7_BtowhFAzftrTijpyss",
    authDomain: "ezsleep-e4c57.firebaseapp.com",
    projectId: "ezsleep-e4c57",
    storageBucket: "ezsleep-e4c57.appspot.com",
    messagingSenderId: "493452915635",
    appId: "1:493452915635:web:b6dce4c98a5af63941d1c6",
    measurementId: "G-7LBEGZ9ZG7"
};
  
//initializes firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  console.log("worked");
}
console.log("have it");

export const auth = firebase.auth();
export const firestore = firebase.firestore()