import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'
//firebase confiv
const firebaseConfig = {
    apiKey: "AIzaSyABItNLgVJV7qm49wPsrKANDIKLv2By5os",
    authDomain: "links-react-firestore.firebaseapp.com",
    projectId: "links-react-firestore",
    storageBucket: "links-react-firestore.appspot.com",
    messagingSenderId: "842665798022",
    appId: "1:842665798022:web:0a55bfa6a71b1f375ca407",
    measurementId: "G-JHGJLQ2786"
};

const fb = firebase.initializeApp(firebaseConfig);

export const db = fb.firestore();