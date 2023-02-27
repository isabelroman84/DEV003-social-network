import Toastify from 'toastify-js';

export const Wall = (onNavigate) => {
  const div = document.createElement('div');
  const divLogo = document.createElement('div');
  const logo = document.createElement('img');
  const title = document.createElement('h2');
  const buttonLogin = document.createElement('button');
  const buttonPassword = document.createElement('button');
  const buttonBack = document.createElement('button');

  divLogo.classList.add('divLogo');
  logo.classList.add('logo');

  logo.src = '../assets/imagenes/citi-pq.png';
  // buttonLogin.textContent = 'Ingresa con e-mail';
  // buttonPassword.textContent = 'Contraseña';
  // buttonBack.textContent = 'Regresar';
  title.textContent = 'Muro';

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

  divLogo.appendChild(logo);
  div.append(divLogo, title, buttonLogin, buttonPassword, buttonBack);

  return divWall;
};
