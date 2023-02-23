// importando funciones que se requieren desde el SDK
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// import {
//   getFirestore,
// } from 'firebase/firestore';

export const firebaseApp = {
  apiKey: 'AIzaSyBeGAbJN5uDTJbeJV7_vpep8UbjEW6STSM',
  authDomain: 'city-fest.firebaseapp.com',
  // databaseURL: 'pendiente',
  projectId: 'city-fest',
  storageBucket: 'city-fest.appspot.com',
  messagingSenderId: '772443005473',
  appId: '1:772443005473:web:400c32aa9fb7ebe62ab960',
  // measurementId: 'pendiente',
};

// Inicializando Firebase
export const app = initializeApp(firebaseApp);

// la app tiene ahora activada la autenticación
export const auth = getAuth(app);
