import Toastify from 'toastify-js';

export const Wall = (onNavigate) => {
  // Creando estructura
  const divWall = document.createElement('div');
  const divLogo = document.createElement('div');
  const divPost = document.createElement('div');
  const logo = document.createElement('img');
  const title = document.createElement('h3');
  const post = document.createElement('input');
  const buttonPublish = document.createElement('button');
  const buttonLogout = document.createElement('button');

  // Asignando clases
  divLogo.classList.add('divLogo');
  logo.classList.add('logo');
  divPost.classList.add('div-post');
  post.classList.add('post');
  buttonPublish.classList.add('button');
  buttonLogout.classList.add('button');

  // Dando contenido a los elementos
  logo.src = '../assets/imagenes/citi-pq.png';
  title.textContent = 'Añade información sobre el evento';
  post.type = 'textarea';
  post.placeholder = 'Evento, fecha y lugar';
  buttonPublish.textContent = 'Publicar';
  buttonLogout.textContent = 'Salir';

  // Asignando padres e hijos
  divLogo.appendChild(logo);
  divPost.append(post, buttonPublish);
  divWall.append(divLogo, title, divPost, buttonLogout);

  buttonPublish.addEventListener('click', () => {
    const postValue = post.value;
    if (post === 'hola') {
      onNavigate('/wall');
      console.log(postValue);
    } else {
      Toastify({
        text: 'El post no puede estar vacío',
        duration: 3000,
        style: {
          background: 'linear-gradient(to right, #f8a72b, #bf523a)',
        },
      }).showToast();
    }
  });

  buttonLogout.addEventListener('click', () => {
    onNavigate('/');
  });
  return divWall;
};
