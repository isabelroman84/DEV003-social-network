import { registerUser } from '../lib/service.js';

export const Register = (onNavigate) => {
  const divRegister = document.createElement('div');
  const title = document.createElement('h2');
  const divForm = document.createElement('div');
  const form = document.createElement('form');
  const inputName = document.createElement('input');
  const inputEmail = document.createElement('input');
  const inputPassword = document.createElement('input');
  const inputRePassword = document.createElement('input');
  const buttonRegister = document.createElement('button');
  // const iconBack = document.createElement('i');

  divRegister.classList.add('divRegister');
  title.textContent = 'Regístrate';
  inputName.placeholder = 'Nombre de Usuario';
  inputEmail.placeholder = 'usuario@usuario.com';
  inputEmail.type = 'email';
  inputPassword.placeholder = 'Crea Contraseña';
  inputPassword.type = 'password';
  inputRePassword.placeholder = 'Repite Contraseña';
  inputRePassword.type = 'password';
  buttonRegister.classList.add('buttonRegister');
  buttonRegister.textContent = 'Crea tu cuenta';

  divRegister.append(title, divForm);
  divForm.appendChild(form);
  form.append(inputName, inputEmail, inputPassword, inputRePassword, buttonRegister);

  // buttonBack.addEventListener('click', () => {
  //   onNavigate('/login');
  // });

  buttonRegister.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('click');
    const nameValue = inputName.value;
    const emailValue = inputEmail.value;
    const passwordValue = inputPassword.value;
    const repeatPassValue = inputRePassword.value;
    console.log(nameValue, emailValue, passwordValue, repeatPassValue);

    if (emailValue && passwordValue) {
      registerUser(emailValue, passwordValue)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // console.log(user);
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

  return divRegister;
};
