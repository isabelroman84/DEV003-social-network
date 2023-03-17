// import { async } from 'regenerator-runtime';
import { showMessage } from '../helpers/templates.js';
import { logOut } from '../lib/serviceAuth.js';
import {
  createPost, deleteComment, getComment, printEvent, updateComment,
} from '../lib/serviceFirestore';

export const Wall = (onNavigate) => {
  /* En login guardé el user en el localStorage y aquí puedo traerlo porque
  lo necesito para activar los botones al dueño de la publicación
  */
  const currentUserId = JSON.parse(localStorage.getItem('user')).uid;

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
  title.classList.add('title');
  divPost.classList.add('div-post');
  comments.classList.add('comments');
  form.classList.add('form-post');
  post.classList.add('post');
  buttonPost.classList.add('btn-post');
  buttonUpdateComment.classList.add('btn-update');
  buttonCancelEdit.classList.add('btn-cancel');
  iconLogout.classList.add('icon-back');

  // Dando contenido a los elementos
  title.textContent = 'No te lo pierdas';
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
        console.log('Código del documento ', docRef.id);
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
      const commentUser = doc.data().userId;
      const eventDate = dataBase.datePost.toDate();
      const formatEvent = new Date(eventDate).toLocaleDateString();

      const eventWriter = commentUser === currentUserId;
      // console.log('¿A quién le corresponde el comentario?', eventWriter);

      showEvent += `
      <div class="data-user" data-id="${doc.id}">
        <div class="header-post">
          <h4>${dataBase.name}</h4>
            <time>${formatEvent}</time>
        </div>
        <div class="input-post">
          <p id="input-edit">${dataBase.post}</p>
        </div>
        <div class="actions">
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
        const confirmDelete = confirm('¿Realmente deseas eliminar esta publicación?');
        if (confirmDelete) {
          deleteComment(dataset.id);
          showMessage('Su mensaje ha sido eliminado con éxito');
        }
      });
    });

    // ----- Editando las publicaciones -----
    // consulta a firebase con commentUser
    let contentInputEvent;
    let dataComment;
    const btnsEdit = comments.querySelectorAll('.btn-edit');
    // console.log(btnsEdit);
    contentInputEvent = form.querySelector('.post');
    // console.log(contentInputEvent);

    btnsEdit.forEach((btn) => {
      btn.addEventListener('click', async ({ target: { dataset } }) => {
        // console.log('Identificador Firestore', dataset.id);
        const getCommentUser = await getComment(dataset.id);
        // console.log('Trae doc(obj)', getCommentUser);
        dataComment = getCommentUser.data();
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
    contentInputEvent = form.querySelector('.post');

    btnUpdateComment.addEventListener('click', (e) => {
      e.preventDefault();
      // let idComment = document.querySelector(`[data-id="${doc.id}"]`);
      console.log('Actualizando', btnUpdateComment);
      console.log('Objeto', dataComment);
      updateComment(buttonUpdateComment.id, post.value);
      buttonUpdateComment.style.display = 'none';
      buttonCancelEdit.style.display = 'none';
      buttonPost.style.display = 'block';
      // dataComment.post = '';
      post.value = '';
    });
  });

  const btnCancelComment = form.querySelector('.btn-cancel');
  btnCancelComment.addEventListener('click', (e) => {
    e.preventDefault();
    buttonUpdateComment.style.display = 'none';
    buttonCancelEdit.style.display = 'none';
    buttonPost.style.display = 'block';
    // dataComment.post = '';
    post.value = '';
  });

  iconLogout.addEventListener('click', () => {
    localStorage.clear();
    logOut().then(() => {
      // Sign-out successful.
    }).catch((error) => {
      console.log(error);
    });
    onNavigate('/');
  });
  return container;
};
