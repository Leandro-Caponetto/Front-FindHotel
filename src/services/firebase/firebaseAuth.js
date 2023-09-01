import { firebase } from './configFirebase.js';
import {
    getAuth,
    signOut,
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
    TwitterAuthProvider,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail as sendPasswordReset,
    updatePassword as updateCurrentUserPassword,
} from 'firebase/auth';

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const twitterProvider = new TwitterAuthProvider();

const auth = getAuth(firebase);

const createUser = async (email, password, name) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password, name);
        return userCredential
    } catch (error) {
        return error.message
    }
}

const signIn = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
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

export {
    createUser,
    signIn,
    signInWithGoogle,
    signInWithFacebook,
    signInWithTwitter,
    logOut,
    resetPassword,
    updateUserPassword
}