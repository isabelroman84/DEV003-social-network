import Toastify from 'toastify-js';
// import { showMessage } from '../helpers/fb_api.js';
import { registerUser } from '../lib/service.js';

export const Register = (onNavigate) => {
   // Creando estructura
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

  // Asignando clases
  divRegister.classList.add('divRegister');
  buttonRegister.classList.add('buttonRegister');

  // Dando contenido a los elementos
  title.textContent = 'Regístrate';
  inputName.placeholder = 'Nombre de Usuario';
  inputEmail.placeholder = 'usuario@usuario.com';
  inputEmail.type = 'email';
  inputPassword.placeholder = 'Crea Contraseña';
  inputPassword.type = 'password';
  inputRePassword.placeholder = 'Repite Contraseña';
  inputRePassword.type = 'password';
  buttonRegister.textContent = 'Crea tu cuenta';

  // Asignando padres e hijos
  divForm.appendChild(form);
  form.append(inputName, inputEmail, inputPassword, inputRePassword, buttonRegister);
  divRegister.append(title, divForm);

  buttonRegister.addEventListener('click', (e) => {
    e.preventDefault();
    // console.log('click');
    const nameValue = inputName.value;
    const emailValue = inputEmail.value;
    const passwordValue = inputPassword.value;
    const repeatPassValue = inputRePassword.value;
    // console.log(nameValue, emailValue, passwordValue, repeatPassValue);

    if (nameValue === '') {
      Toastify({
        text: 'Ingresa un usuario',
        duration: 700,
        style: {
          background: 'linear-gradient(to right, #f8a72b, #bf523a)',
        },
      }).showToast();
    } else if (passwordValue !== repeatPassValue) {
      Toastify({
        text: 'La contraseña no coincide',
        duration: 700,
        style: {
          background: 'linear-gradient(to right, #f2a71b, #bf522a)',
        },
      }).showToast();
    } else if (nameValue && emailValue && passwordValue && repeatPassValue) {
      registerUser(emailValue, passwordValue)
        .then((userCredential) => {
          const user = userCredential.user;
          // console.log(user.email);
          Toastify({
            text: `Ahora puedes publicar ${nameValue}`,
            duration: 400,
            style: {
              background: 'linear-gradient(to right, #f2a71b, #bf522a)',
            },
          }).showToast(user);
          // Signed in
          // console.log(user);
          onNavigate('/wall');
        })
        .catch((error) => {
          const errorCode = error.code;
          // console.log(errorCode);
          // switch (errorCode) {
          //   case 'auth/invalid-email':
          //     console.log('Email inválido');
          //     break;
          //   case 'auth/email-already-exists':
          //     console.log('El correo ya existe');
          //     break;
          // }
          if (errorCode === 'auth/invalid-email') {
            Toastify({
              text: 'Email inválido',
              duration: 700,
              style: {
                background: 'linear-gradient(to right, #f2a71b, #bf522a)',
              },
            }).showToast();
          } else if (errorCode === 'auth/email-already-in-use') {
            Toastify({
              text: 'El correo ya existe',
              duration: 700,
              style: {
                background: 'linear-gradient(to right, #f2a71b, #bf522a)',
              },
            }).showToast();
          } else if (errorCode === 'auth/invalid-password') {
            Toastify({
              text: 'Contraseña inválida',
              duration: 700,
              style: {
                background: 'linear-gradient(to right, #f2a71b, #bf522a)',
              },
            }).showToast();
          } else if (errorCode === 'auth/weak-password') {
            Toastify({
              text: 'Ingrese al menos 6 caracteres',
              duration: 700,
              style: {
                background: 'linear-gradient(to right, #f2a71b, #bf522a)',
              },
            }).showToast();
          }
        });
    }
  });
  return divRegister;
};
