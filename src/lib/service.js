import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from './config';

export const registerUser = function (email, password) {
    createUserWithEmailAndPassword(auth, email, password);
}

export const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
