
export const Register = (onNavigate) => {
  const div = document.createElement('div');
  const title = document.createElement('h2');
  const inputName = document.createElement('input');
  const inputEmail = document.createElement('input');
  const inputPassword = document.createElement('input');
  const inputRePassword = document.createElement('input');
  const buttonCreate = document.createElement('button');
  const buttonBack = document.createElement('button');

  inputName.textContent = 'Nombre';
  inputEmail.textContent = 'E-mail';
  inputPassword.textContent = 'Contraseña';
  inputRePassword.textContent = 'Repetir Contraseña';
  buttonCreate.textContent = 'Crear Cuenta';
  buttonBack.textContent = 'Regresar';
  title.textContent = 'Crea tu cuenta';

  buttonBack.addEventListener('click', () => {
    onNavigate('/login');
  });

  div.append(title, inputName, inputEmail, inputPassword, buttonCreate, buttonBack);

  return div;
};
