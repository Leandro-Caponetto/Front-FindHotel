import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signOut,
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
    TwitterAuthProvider,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword as signInWithEmail,
    sendPasswordResetEmail as sendPasswordReset,
    updatePassword as updateCurrentUserPassword,
} from 'firebase/auth';

import firebase from './configFirebase.js';
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const twitterProvider = new TwitterAuthProvider();

const auth = getAuth(firebase);

const createUser = async (email, password, name) => {
    return await createUserWithEmailAndPassword(auth, email, password, name);
}

const signIn = async (email, password) => {
    return await signInWithEmail(auth, email, password);
};

const signInWithGoogle = async () => {
    return await signInWithPopup(auth, googleProvider)
}

const signInWithFacebook = () => {
    return signInWithPopup(auth, facebookProvider)
}
const signInWithTwitter = () => {
    return signInWithPopup(auth, twitterProvider)
}

const logOut = async () => {
    return await signOut(auth);
}


const resetPassword = async (email) => {
    await sendPasswordReset(auth, email);
};

const updateUserPassword = async (newPassword) => {
    await updateCurrentUserPassword(auth.currentUser, newPassword);
};

