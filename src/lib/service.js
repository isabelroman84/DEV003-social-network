import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
} from 'firebase/auth';

import { auth } from './config.js';

// Función para registrarse
// auth es la configuración del Firebase, también le paso email y password que autenticaré
export function registerUser(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

// Función para iniciar sesión
export const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

// Función para obtener usuario con sesión activa
export const authUser = onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log(uid);
  } else {
    console.log('nada');
  }
});

export const emailVerification = (email) => sendEmailVerification(email, auth.currentUser);
export const logout = () => sendEmailVerification(auth);
