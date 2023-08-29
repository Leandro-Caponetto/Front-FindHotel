export {
    firebase,
    storage,
} from './configFirebase.js'

export {
    uploadFile
} from './firebaseStorage.js'

export {
    createUser,
    signIn,
    signInWithGoogle,
    signInWithFacebook,
    signInWithTwitter,
    logOut,
    resetPassword,
    updateUserPassword
} from './firebaseAuth.js'