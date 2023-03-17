import { showMessage } from '../helpers/templates.js';
import {
  auth, registerUser, sendEmail, updateName,
} from '../lib/serviceAuth';

export const Register = (onNavigate) => {
  // Creando estructura
  const container = document.createElement('div');
  const divForm = document.createElement('div');
  const divError = document.createElement('div');
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
  divError.classList.add('div-error');
  form.classList.add('form-register');
  inputName.classList.add('input');
  inputEmail.classList.add('input');
  inputPassword.classList.add('input');
  inputRePassword.classList.add('input');
  buttonRegister.classList.add('btn');
  iconBack.classList.add('icon-back');

  // Dando contenido a los elementos
  title.textContent = 'Regístrate';
  inputName.name = 'nameuser';
  inputName.placeholder = 'Ingresa un nombre de usuario';
  inputName.autocomplete = 'off';
  inputName.id = 'entry-name';
  inputEmail.name = 'email';
  inputEmail.placeholder = 'usuario@usuario.com';
  inputEmail.type = 'email';
  inputEmail.autocomplete = 'off';
  inputPassword.name = 'password';
  inputPassword.placeholder = 'Crea una contraseña';
  inputPassword.type = 'password';
  inputPassword.autocomplete = 'off';
  inputRePassword.name = 'repeat';
  inputRePassword.placeholder = 'Repite tu contraseña';
  inputRePassword.type = 'password';
  inputRePassword.autocomplete = 'off';
  buttonRegister.textContent = 'Crea tu cuenta';
  // buttonRegister.type = 'submit';
  iconBack.src = '../assets/img/back.png';

  // Asignando padres e hijos
  form.append(title, inputName, inputEmail);
  form.append(inputPassword, inputRePassword, buttonRegister);
  divForm.appendChild(form);
  container.append(iconBack, divForm, divError);

  // Asignando funcionalidad
  iconBack.addEventListener('click', () => {
    onNavigate('/login');
  });

  const entryName = form.querySelector('#entry-name');
  entryName.addEventListener('input', () => {
    const upperText = entryName.value.toUpperCase();
    entryName.value = upperText;
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // console.log('click');
    const nameUser = form.nameuser.value;
    const emailUser = form.email.value;
    const passwordUser = form.password.value;
    const repeatPass = form.repeat.value;
    // console.log(nameUser, emailUser, passwordUser, repeatPass);

    if (nameUser === '' && nameUser.length < 5) {
      showMessage('Ingresa un nombre de usuario válido');
    } else if (passwordUser !== repeatPass) {
      showMessage('La contraseña no coincide');
    } else if (nameUser && emailUser && passwordUser && repeatPass) {
      registerUser(emailUser, passwordUser)
        .then((userCredential) => {
          console.log('Estas son las credenciales -->', userCredential.user);
          sendEmail().then(() => {
            updateName(nameUser).then(() => {
              showMessage('Verifica tu email');
              // alert('Verifica tu email');
              onNavigate('/login');
            });
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          // console.log(errorCode);
          switch (errorCode) {
            case 'auth/invalid-email':
              showMessage('El email no es válido');
              break;
            case 'auth/user-not-found':
              showMessage('Todavía no se ha registrado');
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
