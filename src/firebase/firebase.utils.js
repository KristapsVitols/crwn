import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAfhqqhaMTHrzMvQbtGjs8wSUXlxrXxGYo",
    authDomain: "crwn-db-9a036.firebaseapp.com",
    databaseURL: "https://crwn-db-9a036.firebaseio.com",
    projectId: "crwn-db-9a036",
    storageBucket: "",
    messagingSenderId: "188699318521",
    appId: "1:188699318521:web:7d47ada5e4ffc0d7"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const SignInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
