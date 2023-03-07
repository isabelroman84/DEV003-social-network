import {
  addDoc,
  collection,
  getFirestore,
} from 'firebase/firestore';
import { app } from './serviceAuth.js';

// ---------- Inicializando Cloud Firestore ----------
const db = getFirestore(app);

// ---------- Agregando datos a Firestore ----------
// export const createPost = (name, postUser, uidUser) => addDoc(collection(db, 'eventos'), {
//   name,
//   postUser,
//   uidUser,
//   like: [],
// });
// export const createPost = (post) => addDoc(collection(db, 'eventos'), { ...post });
/* Post es un objeto. addDoc recibe la referencia a una colección(base de datos, nombre colección)
    y el objeto post */
export const createPost = (post) => addDoc(collection(db, 'eventos'), { post });

// ---------- Leyendo datos de Firestore ----------
// export const getPost = (doc) => getDoc(collection(db, 'eventos'), { doc });

// const querySnapshot = await getDocs(collection(db, "users"));
// querySnapshot.forEach((doc) => {
//   console.log(`${doc.id} => ${doc.data()}`);
// });
