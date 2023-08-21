/* eslint-disable no-undef */
// Importamos la función para inicializar la aplicación de Firebase

import * as firebase from "firebase/app";
import "firebase/auth";
require("dotenv").config();

// Añade aquí tus credenciales
const firebaseAccountConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
};

firebase.initializeApp(firebaseAccountConfig);

export default firebase

