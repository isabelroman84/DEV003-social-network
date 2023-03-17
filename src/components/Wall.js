/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
// import { async } from 'regenerator-runtime';
import { showMessage } from '../helpers/templates.js';
import { logOut } from '../lib/serviceAuth.js';
import {
  createPost,
  deleteComment,
  getComment,
  printEvent,
  updateComment,
  updateLike,
  removeLike,
} from '../lib/serviceFirestore';

export const Wall = (onNavigate) => {
  /* En login guardé el user en el localStorage y aquí puedo traerlo porque
  lo necesito para activar los botones al dueño de la publicación
  */
  const currentUserId = JSON.parse(localStorage.getItem('user')).uid;
  const displayNameUser = JSON.parse(localStorage.getItem('user')).displayName;

  // Creando estructura
  const container = document.createElement('div');
  const divPost = document.createElement('div');
  const comments = document.createElement('section');
  const title = document.createElement('h3');
  const form = document.createElement('form');
  const post = document.createElement('textarea');
  const buttonPost = document.createElement('button');
  const buttonUpdateComment = document.createElement('button');
  const buttonCancelEdit = document.createElement('button');
  const iconLogout = document.createElement('img');

  // Asignando clases
  container.classList.add('container');
  title.classList.add('title-wall');
  divPost.classList.add('div-post');
  comments.classList.add('comments');
  form.classList.add('form-post');
  post.classList.add('post');
  buttonPost.classList.add('btn-post');
  buttonUpdateComment.classList.add('btn-update');
  buttonCancelEdit.classList.add('btn-cancel');
  iconLogout.classList.add('icon-back');

  // Dando contenido a los elementos
  title.textContent = `HOLA ${displayNameUser}`;
  post.name = 'message';
  post.maxLength = 300;
  post.autocomplete = 'off';
  post.placeholder = 'Agrega aquí información de tu evento (fecha, lugar, valor)';
  buttonPost.textContent = 'Invita';
  buttonPost.type = 'submit';
  buttonUpdateComment.textContent = 'Actualizar';
  buttonCancelEdit.textContent = 'Cancelar';
  iconLogout.src = '../assets/img/logout.png';

  // Asignando padres e hijos
  // divHelper.insertAdjacentElement('afterbegin', title);
  form.append(post, buttonPost, buttonUpdateComment, buttonCancelEdit);
  divPost.append(form);
  container.append(iconLogout, title, divPost, comments);

  // Asignando funcionalidad
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const postUser = form.message.value;
    // console.log('Este es el post-->', postUser);
    if (postUser === '') {
      showMessage('Ingresa la descripción de tu evento');
      return;
    }

    createPost(postUser)
      .then((docRef) => {
        showMessage('Tu evento se ha creado con éxito');
        // console.log('Código del documento ', docRef.id);
        form.reset();
      }).catch(() => {
        showMessage('Tu evento no pudo publicarse. Inténtalo de nuevo');
      });
  });
  // ----- Mostrando evento en la interfaz -----
  printEvent((querySnapshot) => {
    // console.log('Esta es la consulta', querySnapshot);
    let showEvent = '';
    querySnapshot.forEach((doc) => {
      // console.log('¿Qué se ve?', doc.id, ' => ', doc.data().userId === currentUserId);
      const dataBase = doc.data();
      const commentUser = doc.data().userUid;
      const eventDate = dataBase.datePost.toDate();
      const formatEvent = new Date(eventDate).toLocaleDateString();

      const eventWriter = commentUser === currentUserId;
      // console.log('¿A quién le corresponde el comentario?', eventWriter);

      showEvent += `
      <div class="data-user" data-id="${doc.id}">
        <div class="header-post">
          <h4>${dataBase.name}</h4>
            <time class="time">${formatEvent}</time>
        </div>
        <div class="input-post">
          <p id="input-edit">${dataBase.post}</p>
        </div>
        <div class="actions">
        <div class="like">
          <img src="../assets/img/star.png" alt="edit" data-id="${doc.id}" class="btn-like">
            <p class="count">${dataBase.like.length}</p>
            </div>
          ${eventWriter ? `<img src="../assets/img/edit.png" alt="edit" data-id="${doc.id}" class="btn-edit none"> ` : ''}
          ${eventWriter ? `<img src="../assets/img/delete.png" alt="btn-delete" data-id="${doc.id}"class="btn-delete none">` : ''}
        </div>
      </div>
          `;
    });

    comments.innerHTML = showEvent;
    // console.log(comments);

    // ----- Eliminando las publicaciones -----
    const btnsDelete = comments.querySelectorAll('.btn-delete');
    // console.log(btnsDelete);
    btnsDelete.forEach((btn) => {
      btn.addEventListener('click', ({ target: { dataset } }) => {
        // console.log('Borrando', dataset.id);
        // eslint-disable-next-line no-restricted-globals
        const confirmDelete = confirm('¿Realmente deseas eliminar esta publicación?');
        if (confirmDelete) {
          deleteComment(dataset.id);
          showMessage('Su mensaje ha sido eliminado con éxito');
        }
      });
    });

    // ----- Editando las publicaciones -----
    // consulta a firebase con commentUser
    const contentInputEvent = form.querySelector('.post');
    const btnsEdit = comments.querySelectorAll('.btn-edit');

    // Dando like
    const btnsLike = comments.querySelectorAll('.btn-like');
    btnsLike.forEach((btn) => {
      // console.log('Este es like', btn);
      btn.addEventListener('click', ({ target: { dataset } }) => {
        // console.log('Este es event', dataset.id);
        getComment(dataset.id).then((doc) => {
          const getLikes = doc.data();
          const countLikes = getLikes.like;
          // console.log('Esta es la data de los likes', getLikes);
          // console.log('Este es el array', countLikes);
          if (countLikes.includes(currentUserId)) {
            removeLike(dataset.id, currentUserId);
          } else {
            updateLike(dataset.id, currentUserId);
          }
        });
      });
    });

    btnsEdit.forEach((btn) => {
      btn.addEventListener('click', async ({ target: { dataset } }) => {
        // console.log('Identificador Firestore', dataset.id);
        const getCommentUser = await getComment(dataset.id);
        // console.log('Trae doc(obj)', getCommentUser);
        const dataComment = getCommentUser.data();
        // console.log('Convirtiendo a datos', dataComment.userId);
        contentInputEvent.value = dataComment.post;
        buttonUpdateComment.style.display = 'block';
        buttonCancelEdit.style.display = 'block';
        buttonUpdateComment.id = dataset.id;
        // console.log('Id post', buttonUpdateComment.id);
        buttonPost.style.display = 'none';
      });
    });

    const btnUpdateComment = form.querySelector('.btn-update');

    btnUpdateComment.addEventListener('click', (e) => {
      e.preventDefault();
      // let idComment = document.querySelector(`[data-id="${doc.id}"]`);
      // console.log('Actualizando', btnUpdateComment);
      // console.log('Objeto', dataComment);
      updateComment(buttonUpdateComment.id, contentInputEvent.value).then(() => {
        buttonUpdateComment.style.display = 'none';
        buttonCancelEdit.style.display = 'none';
        buttonPost.style.display = 'block';
        contentInputEvent.value = '';
      });
    });
  });

  const btnCancelComment = form.querySelector('.btn-cancel');
  btnCancelComment.addEventListener('click', (e) => {
    e.preventDefault();
    buttonUpdateComment.style.display = 'none';
    buttonCancelEdit.style.display = 'none';
    buttonPost.style.display = 'block';
    post.value = '';
  });

  iconLogout.addEventListener('click', () => {
    localStorage.clear();
    logOut().then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // console.log(error);
    });
    onNavigate('/');
  });
  return container;
};
