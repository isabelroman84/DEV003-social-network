import { userElement } from '../app/funciones-firebase.js';

export const Register = (onNavigate) => {
  const div = document.createElement('div');
  const divForm = document.createElement('div');
  const form = document.createElement('form');
  divForm.append(form);
  const title = document.createElement('h2');
  // const inputName = document.createElement('input');
  const inputEmail = document.createElement('input');
  const inputPassword = document.createElement('input');
  // const inputRePassword = document.createElement('input');
  const buttonRegister = document.createElement('button');
  form.append(inputEmail, inputPassword, buttonRegister);
  const buttonGoogle = document.createElement('button');
  const buttonBack = document.createElement('button');

  // inputName.textContent = 'Nombre';
  inputEmail.textContent = 'E-mail';
  inputPassword.textContent = 'Contraseña';
  // inputRePassword.textContent = 'Repetir Contraseña';
  buttonRegister.textContent = 'Crear Cuenta';
  buttonGoogle.textContent = 'Continuar con Google';
  buttonBack.textContent = 'Regresar';
  title.textContent = 'Crea tu cuenta';

  buttonBack.addEventListener('click', () => {
    onNavigate('/login');
  });

  buttonRegister.addEventListener('click', () => {
    const emailValue = inputEmail.value;
    const passwordValue = inputPassword.value;
    if (emailValue && passwordValue) {
      userElement(emailValue, passwordValue)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          onNavigate('/login');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
        });
    }
  });
  div.append(title, divForm, buttonGoogle, buttonBack);

  return div;
};
