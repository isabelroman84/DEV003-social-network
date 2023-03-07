import { showMessage } from '../helpers/templates.js';
import { authUser, logOut } from '../lib/serviceAuth.js';
import { createPost } from '../lib/serviceFirestore';

let userWall = '';
let userIdWall = '';

authUser((user) => {
  console.log(user);
  userWall = user.displayname;
  userIdWall = user.uid;
});

export const Wall = (onNavigate) => {
  // Creando estructura
  const container = document.createElement('div');
  const divPost = document.createElement('div');
  const title = document.createElement('h3');
  const form = document.createElement('form');
  const post = document.createElement('textarea');
  const buttonPost = document.createElement('button');
  const iconLogout = document.createElement('img');

  // Asignando clases
  container.classList.add('container');
  title.classList.add('title');
  divPost.classList.add('div-post');
  form.classList.add('form-post');
  post.classList.add('post');
  buttonPost.classList.add('btn-post');
  iconLogout.classList.add('icon-back');

  // Dando contenido a los elementos
  title.textContent = 'No te lo pierdas';
  post.name = 'message';
  post.maxLength = 300;
  post.autocomplete = 'off';
  post.placeholder = 'Agrega aquí información de tu evento (fecha, lugar, valor)';
  buttonPost.textContent = 'Postear';
  buttonPost.type = 'submit';
  iconLogout.src = '../assets/img/logout.png';

  // Asignando padres e hijos
  form.append(post, buttonPost);
  divPost.append(form);
  container.append(iconLogout, title, divPost);

  // Asignando funcionalidad

  // getPost();

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const postUser = form.message.value;
    console.log('Este es el post-->', postUser);

    if (postUser === '') {
      showMessage('Ingresa la descripción de tu evento');
      return;
    }
    // firestore ejemplo
    // try {
    //   const docRef = await addDoc(collection(db, "users"), {
    //     first: "Ada",
    //     last: "Lovelace",
    //     born: 1815
    //   });
    //   console.log("Document written with ID: ", docRef.id);
    // } catch (e) {
    //   console.error("Error adding document: ", e);
    // }

    // nuestro servicio
    // export const createPost = (post) => addDoc(collection(db, 'posts'), post);

    createPost({
      postUser,
    }).then((docRef) => {
      // que hacemos cuando se crea el post exitosamente?
      showMessage('Tu evento se ha creado con éxito');

      console.log('Document written with ID: ', docRef.id);
      console.log('Document written with ID: ', postUser);

      // limpiar el formulario
      form.reset();
      // mostrar un mensaje de que el post se creo exitosamente
    }).catch(() => {
      // que hacemos cuando hay un error durante la creacion del post?
      showMessage('Tu evento no pudo publicarse. Inténtalo de nuevo');

      // console.error("Error adding document: ", e);

      // mostrar un mensaje de que el post no se pudo crear por un error
    });
  });

  iconLogout.addEventListener('click', () => {
    logOut().then(() => {
      // Sign-out successful.
    }).catch((error) => {
      console.log(error);
    });
    onNavigate('/');
  });
  return container;
};
