import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

import { firebaseApp } from './firebase.js';

export const app = initializeApp(firebaseApp);
export const auth = getAuth(app);

export const userElement = (email, password) => createUserWithEmailAndPassword(auth, email, password);
