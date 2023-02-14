export const Register = () => {
  const div = document.createElement('div');
  const title = document.createElement('h2');
  const buttonName = document.createElement('button');
  const buttonLogin = document.createElement('button');
  const buttonPassword = document.createElement('button');
  const buttonBack = document.createElement('button');

  buttonName.textContent = 'Nombre';
  buttonLogin.textContent = 'E-mail';
  buttonPassword.textContent = 'Contraseña';
  buttonBack.textContent = 'Regresar';
  title.textContent = 'Crea tu cuenta';

  buttonBack.addEventListener('click', () => {
    window.location.pathname = '/enter';
  });

  div.append(title, buttonName, buttonLogin, buttonPassword, buttonBack);

  return div;
};
