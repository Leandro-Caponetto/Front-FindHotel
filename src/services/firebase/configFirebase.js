/* eslint-disable no-undef */
// Importamos la función para inicializar la aplicación de Firebase

import * as firebase from "firebase/app";
import "firebase/auth";
import {getStorage} from "firebase/storage";

const firebaseAccountConfig = {
    apiKey: "AIzaSyBt5GxrrSST0CKhSqqAml9j9-iH1-NWQg",
    authDomain: "find-hotel-396121.firebaseapp.com",
    projectId: "find-hotel-396121",
    storageBucket: "find-hotel-396121.appspot.com",
    messagingSenderId: "467499107156",
    appId:"1:467499107156:web:fec7a5fc7396c464f03ec1",
};

const app = firebase.initializeApp(firebaseAccountConfig);
const storage=getStorage(app)


export {app, storage}

