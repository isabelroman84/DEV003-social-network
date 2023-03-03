import { showMessage } from '../helpers/templates.js';
import { Header } from './Header.js';
import { registerUser, sendEmail } from '../lib/service.js';
// import { auth } from '../lib/config.js';

export const Register = (onNavigate) => {
  // Creando estructura
  const container = document.createElement('div');
  const divForm = document.createElement('div');
  const title = document.createElement('h2');
  const form = document.createElement('form');
  const inputName = document.createElement('input');
  const inputEmail = document.createElement('input');
  const inputPassword = document.createElement('input');
  const inputRePassword = document.createElement('input');
  const buttonRegister = document.createElement('button');
  const iconBack = document.createElement('img');

  // Asignando clases
  container.classList.add('container');
  divForm.classList.add('div-form');
  form.classList.add('form-register');
  inputName.classList.add('input');
  inputEmail.classList.add('input');
  inputPassword.classList.add('input');
  inputRePassword.classList.add('input');
  buttonRegister.classList.add('btn');
  iconBack.classList.add('icon-back');

  // Dando contenido a los elementos
  title.textContent = 'Regístrate';
  inputName.placeholder = 'Ingresa un nombre de usuario';
  inputEmail.placeholder = 'usuario@usuario.com';
  inputEmail.type = 'email';
  inputPassword.placeholder = 'Crea una contraseña';
  inputPassword.type = 'password';
  inputRePassword.placeholder = 'Repite tu contraseña';
  inputRePassword.type = 'password';
  buttonRegister.textContent = 'Crea tu cuenta';
  iconBack.src = '../assets/img/back.png';

  // Asignando padres e hijos
  form.append(title, inputName, inputEmail);
  form.append(inputPassword, inputRePassword, buttonRegister);
  divForm.appendChild(form);
  container.append(Header(), iconBack, divForm);

  // Asignando funcionalidad
  iconBack.addEventListener('click', () => {
    onNavigate('/login');
  });

  buttonRegister.addEventListener('click', (e) => {
    e.preventDefault();
    // console.log('click');
    const nameValue = inputName.value;
    const emailValue = inputEmail.value;
    const passwordValue = inputPassword.value;
    const repeatPassValue = inputRePassword.value;
    // console.log(nameValue, emailValue, passwordValue, repeatPassValue);

    if (nameValue === '') {
      showMessage('Ingresa un nombre de usuario');
    } else if (passwordValue !== repeatPassValue) {
      showMessage('La contraseña no coincide');
    } else if (nameValue && emailValue && passwordValue && repeatPassValue) {
      registerUser(emailValue, passwordValue)
        .then((userCredential) => {
        // console.log(auth.currentUser);
          const user = userCredential.user;
          console.log(user);
          return sendEmail();
        })
        .then(() => {
          showMessage('Verifica tu email');
          // console.log(res);
          // alert('Verifica tu email');
          onNavigate('/login');
        })
        .catch((error) => {
          const errorCode = error.code;
          console.log(errorCode);
          switch (errorCode) {
            case 'auth/invalid-email':
              showMessage('El email no es válido');
              break;
            case 'auth/email-already-exists':
              showMessage('El correo ya está registrado');
              break;
            case 'auth/email-already-in-use':
              showMessage('El correo ya está en uso');
              break;
            case 'auth/invalid-password':
              showMessage('Contraseña incorrecta');
              break;
            case 'auth/weak-password':
              showMessage('Ingresa al menos 6 caracteres');
              break;
            default:
              console.log('error');
          }
        });
    }
  });
  return container;
};
