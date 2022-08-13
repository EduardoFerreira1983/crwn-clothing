
import { initializeApp } from 'firebase/app';

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZ9rYH3OYxuavluTpsNiworVCVD0xJXA4",
  authDomain: "crown-clothing-db-6c9de.firebaseapp.com",
  projectId: "crown-clothing-db-6c9de",
  storageBucket: "crown-clothing-db-6c9de.appspot.com",
  messagingSenderId: "251088915245",
  appId: "1:251088915245:web:63040c1fb254f9561f21a4"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup( auth, provider );

// CRUD - Firestore //


export const db = getFirestore();

export const createUserDocumentFromAuth = async ( userAuth ) => {
    const userDocRef = doc( db, 'users', userAuth.uid );

  const userSnapshot = await getDoc(userDocRef); // data - specific object
 
  if (!userSnapshot.exists()) { // if is true, exist documents from firestore
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { // asynchronous
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};