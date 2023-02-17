export const Login = (onNavigate) => {
  const div = document.createElement('div');
  const title = document.createElement('h2');
  const inputLogin = document.createElement('input');
  const inputPassword = document.createElement('input');
  const buttonLogin = document.createElement('button');
  const buttonRegister = document.createElement('button');
  const buttonGoogle = document.createElement('button');

  inputLogin.textContent = 'Ingresa con e-mail';
  inputPassword.textContent = 'Contraseña';
  buttonLogin.textContent = 'Ingresar';
  buttonRegister.textContent = 'Regístrate';

  buttonGoogle.textContent = 'Continuar con Google';

  title.textContent = 'City Fest';

 buttonLogin.addEventListener('click', () => {
    onNavigate('/wall');
  });

  buttonRegister.addEventListener('click', () => {
    onNavigate('/register');
  });

  buttonGoogle.addEventListener('click', () => {
    onNavigate('/google');
  });

  div.append(title, inputLogin, inputPassword, buttonLogin, buttonGoogle, buttonRegister);

  return div;
};
