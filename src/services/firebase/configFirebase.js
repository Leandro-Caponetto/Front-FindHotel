/* eslint-disable no-undef */
// Importamos la función para inicializar la aplicación de Firebase
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import FirebaseKey from '/FirebaseKey.json'

// Añade aquí tus credenciales
const firebaseAccountConfig = {
    ...FirebaseKey
};

const firebase = initializeApp(firebaseAccountConfig);

const storage = getStorage(firebase)


export { firebase, storage }