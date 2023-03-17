import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { app, auth } from './serviceAuth.js';

// ---------- Inicializando Cloud Firestore (conexión a la base de datos) ----------
const db = getFirestore(app);

// ---------- Agregando datos a Firestore ----------
/* Post es un objeto. Voy a añadir un documento en la colección eventos y le paso los
datos */
export const createPost = (post) => addDoc(collection(db, 'eventos'), {
  name: auth.currentUser.displayName,
  userUid: auth.currentUser.uid,
  datePost: serverTimestamp(),
  post,
  like: [],
});

// ---------- Mostrando los post en consola ----------
/* Hace una consulta a la colección en tiempo real (querySnapshot) y recupera
los resultados con getDocs */
export const querySnapshot = () => getDocs(collection(db, 'eventos'));

// ---------- Creando instantáneas de la colección de Firestore ----------
/* query es una función de consulta para especificar los documentos que quiero recuperar */
const q = query(collection(db, 'eventos'), orderBy('datePost', 'desc'));
export const printEvent = (consult) => onSnapshot(q, consult);

// ---------- Recuperando un documento de Firestore ----------
export const getComment = (id) => getDoc(doc(db, 'eventos', id));

// ---------- Borrando un documento de Firestore ----------
// si esto tenía un await, por qué no lo usé en forma de promesa?
export const deleteComment = (id) => deleteDoc(doc(db, 'eventos', id));

// ---------- Recuperando un documento de Firestore ----------
export const updateComment = (id, post) => updateDoc(doc(db, 'eventos', id), { post });

// ---------- Sección de like ----------
export const updateLike = (id, uid) => updateDoc(doc(db, 'eventos', id), {
  like: arrayUnion(uid),
});

export const removeLike = (id, uid) => updateDoc(doc(db, 'eventos', id), {
  like: arrayRemove(uid),
});
