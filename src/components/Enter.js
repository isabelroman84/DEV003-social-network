export const Enter = () => {
  const div = document.createElement('div');
  const title = document.createElement('h2');
  const buttonLogin = document.createElement('button');
  const buttonRegister = document.createElement('button');
  const buttonGoogle = document.createElement('button');

  buttonLogin.textContent = 'Ingresa con e-mail';
  buttonRegister.textContent = 'Regístrate';
  buttonGoogle.textContent = 'Continuar con Google';
  title.textContent = 'Eventos a un clic';

  buttonLogin.addEventListener('click', () => {
    window.location.pathname = '/login';
  });

  buttonRegister.addEventListener('click', () => {
    window.location.pathname = '/register';
  });

  buttonGoogle.addEventListener('click', () => {
    window.location.pathname = '/google';
  });

  div.append(title, buttonLogin, buttonRegister, buttonGoogle);

  return div;
};
