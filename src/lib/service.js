import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithRedirect,
} from 'firebase/auth';

import { auth, provider } from './config.js';

// Función para registrarse
// auth es la configuración del Firebase, también le paso email y password que autenticaré
export function registerUser(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export const sendEmail = () => sendEmailVerification(auth.currentUser);
// export const emailVerification = () => isSignInWithEmailLink(auth, window.location.href);

// Función para iniciar sesión
export const loginEmail = (email, password) => signInWithEmailAndPassword(auth, email, password);

// Función para obtener usuario con sesión activa
export const authUser = onAuthStateChanged(auth, (user) => {
  if (user) {
    // onNavigate('/wall');
    const uid = user.uid;
    console.log(uid);
  } else {
    console.log('nada');
    // onNavigate('/');
  }
});

export const authGoogle = () => signInWithRedirect(auth, provider);

// export const logout = () => sendEmailVerification(auth);
