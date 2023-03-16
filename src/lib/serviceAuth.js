import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';

import { firebaseApp } from './config.js';

// ---------- Inicializando Firebase ----------
export const app = initializeApp(firebaseApp);

// la app tiene ahora activada la autenticación con email y contraseña
export const auth = getAuth();
// console.log('Esto es auth -->', auth);

// ---------- Función para registrarse ----------
export function registerUser(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export const sendEmail = () => sendEmailVerification(auth.currentUser);
// export const emailVerification = () => isSignInWithEmailLink(auth, window.location.href);

// ---------- Consultando el nombre del usuario que se registra con correo ----------
export const updateName = (name) => updateProfile(auth.currentUser, {
  displayName: name,
});

// ---------- Función para iniciar sesión ----------
export const loginEmail = (email, password) => signInWithEmailAndPassword(auth, email, password);

// Iniciando sesión con Google
export const provider = new GoogleAuthProvider();
export const authGoogle = () => signInWithPopup(auth, provider);
// export { GoogleAuthProvider };

// ---------- Función para obtener usuario con sesión activa (observador) ----------
// export const authUser = onAuthStateChanged(auth, (user) => {
//   if (user) {
//     const uid = user.uid;
//     console.log('Usuario logueado', auth.currentUser);
//   } else {
//     console.log('No hay usuario logueado');
//     // onNavigate('/');
//   }
// });
export const authUser = onAuthStateChanged(auth, (user) => {
  console.log('Usuario logueado por evento', user);
  return user;
});

// ---------- Función para cerrar sesión ----------
export const logOut = () => signOut(auth);
