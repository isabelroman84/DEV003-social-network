import { showMessage } from '../helpers/templates.js';
import { Header } from './Header.js';

export const Wall = (onNavigate) => {
  // Creando estructura
  const container = document.createElement('div');
  const divPost = document.createElement('div');
  const title = document.createElement('h3');
  const post = document.createElement('input');
  const buttonPublish = document.createElement('button');
  const buttonLogout = document.createElement('button');

  // Asignando clases
  container.classList.add('container-wall');
  divPost.classList.add('div-post');
  post.classList.add('post');
  buttonPublish.classList.add('btn');
  buttonLogout.classList.add('button');

  // Dando contenido a los elementos
  title.textContent = 'Añade información sobre el evento';
  post.type = 'textarea';
  post.placeholder = 'Evento, fecha y lugar';
  buttonPublish.textContent = 'Publicar';
  buttonLogout.textContent = 'Salir';

  // Asignando padres e hijos
  divPost.append(post, buttonPublish);
  container.append(Header(), title, divPost, buttonLogout);

  buttonPublish.addEventListener('click', () => {
    const postValue = post.value;
    if (post === 'hola') {
      onNavigate('/wall');
      console.log(postValue);
    } else {
      showMessage('El post no puede estar vacío');
    }
  });

  buttonLogout.addEventListener('click', () => {
    onNavigate('/');
  });
  return container;
};
