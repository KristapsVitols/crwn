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

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) {
        return;
    }

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (err) {
            console.log('error creating user', err.message);
        }
    }

    return userRef;
};

firebase.initializeApp(config);

export const addCollectionItems = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();

    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });

    return await batch.commit();
};

export const convertCollectionsSnapshotToMap = collections => {
    const transformedCollections = {};

    collections.docs.forEach(doc => {
        const {title, items} = doc.data();

        transformedCollections[title.toLowerCase()] = {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items,
        };
    });

    return transformedCollections;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const SignInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
