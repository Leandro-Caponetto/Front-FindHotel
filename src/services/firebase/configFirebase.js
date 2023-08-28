/* eslint-disable no-undef */
// Importamos la función para inicializar la aplicación de Firebase
import * as firebase from "firebase/app";
import "firebase/auth";
import FirebaseKey from '/FirebaseKey.json'

// Añade aquí tus credenciales
const firebaseAccountConfig = {
    FirebaseKey
};

firebase.initializeApp(firebaseAccountConfig);

export default firebase