import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBZ9rYH3OYxuavluTpsNiworVCVD0xJXA4",
  authDomain: "crown-clothing-db-6c9de.firebaseapp.com",
  projectId: "crown-clothing-db-6c9de",
  storageBucket: "crown-clothing-db-6c9de.appspot.com",
  messagingSenderId: "251088915245",
  appId: "1:251088915245:web:63040c1fb254f9561f21a4"
};
 

initializeApp( firebaseConfig );

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async( userAuth, additionalInformation = {} ) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async( email, password ) => {
  if ( !email || !password ) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async( email, password ) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword( auth, email, password );
};

export const signOutUser = async () => await signOut( auth );

export const onAuthUserStateChanged = ( callback ) => onAuthStateChanged ( auth, callback );