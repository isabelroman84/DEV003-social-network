import Toastify from 'toastify-js';

export const Wall = (onNavigate) => {
  const divWall = document.createElement('div');
  const divPost = document.createElement('div');
  const title = document.createElement('h3');
  const post = document.createElement('input');
  const buttonPublish = document.createElement('button');
  const buttonLogout = document.createElement('button');

  divWall.classList.add('divWall');
  divPost.classList.add('divPost');
  buttonLogout.classList.add('button');

  title.textContent = 'Ingresa aquí los datos de tu evento';
  post.type = 'textarea';
  post.placeholder = 'Evento, Fecha, Lugar';
  buttonPublish.textContent = 'Publicar';
  buttonLogout.textContent = 'Salir';

  divPost.append(post, buttonPublish);
  divWall.append(title, divPost, buttonLogout);

  buttonPublish.addEventListener('click', () => {
    const postValue = post.value;
    if (post.length > 1) {
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
