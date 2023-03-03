import { GoogleAuthProvider } from 'firebase/auth';
import { Header } from './Header.js';
import { showMessage } from '../helpers/templates.js';
import { authGoogle, loginEmail } from '../lib/service';

export const Login = (onNavigate) => {
  // Creando estructura
  const container = document.createElement('div');
  const divForm = document.createElement('div');
  const divGmail = document.createElement('div');
  const divLine = document.createElement('div');
  const form = document.createElement('form');
  const labelEmail = document.createElement('label');
  const labelPassword = document.createElement('label');
  const inputEmail = document.createElement('input');
  const inputPassword = document.createElement('input');
  const buttonLogin = document.createElement('button');
  const line = document.createElement('hr');
  const buttonGoogle = document.createElement('img');
  const register = document.createElement('p');
  const registerhref = document.createElement('a');

  // Asignando clases
  container.classList.add('container');
  divForm.classList.add('div-form');
  divGmail.classList.add('div-gmail');
  divLine.classList.add('line');
  form.classList.add('form');
  labelEmail.classList.add('label');
  labelPassword.classList.add('label');
  inputEmail.classList.add('input');
  inputPassword.classList.add('input');
  buttonLogin.classList.add('btn');
  line.classList.add('hr');
  register.classList.add('register');
  registerhref.classList.add('href');
  buttonGoogle.classList.add('google');

  // Dando contenido a los elementos
  inputEmail.type = 'email';
  labelEmail.textContent = 'Email';
  inputEmail.placeholder = 'usuario@usuario.com';
  inputPassword.type = 'password';
  labelPassword.textContent = 'Contraseña';
  inputPassword.placeholder = '**************';
  buttonLogin.textContent = 'Ingresar';
  buttonGoogle.textContent = 'Ingresar con Google';
  register.textContent = '¿Aún no tienes una cuenta?';
  registerhref.setAttribute('href', '/register');
  registerhref.textContent = 'Regístrate';
  buttonGoogle.src = '../assets/img/google_1x.png';

  // Asignando padres e hijos
  divLine.appendChild(line);
  form.append(labelEmail, inputEmail, labelPassword, inputPassword, buttonLogin);
  form.append(divLine, buttonGoogle, register);
  register.appendChild(registerhref);
  divForm.appendChild(form);
  container.append(Header(), divForm);

  buttonLogin.addEventListener('click', (e) => {
    e.preventDefault();
    const emailValue = inputEmail.value;
    const passwordValue = inputPassword.value;
    // console.log(email, password);
    if (emailValue === '' || passwordValue === '') {
      showMessage('Completa el campo', 'error');
    } else if (emailValue && passwordValue) {
      loginEmail(emailValue, passwordValue)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          if (!user.emailVerified) {
            showMessage('Por favor verifica el email');
            // alert('Por favor verifica el email');
            return;
          }
          onNavigate('/wall');
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode === 'auth/invalid-email') {
            showMessage('La contraseña es incorrecta');
          }
        });
    }
  });

  buttonGoogle.addEventListener('click', () => {
    const userGoogle = GoogleAuthProvider;
    // const authUserGoogle = window.history.pushState(onNavigate('/wall'));

    authGoogle(userGoogle)
      .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        console.log(credential);
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        // ...
        // return authUserGoogle;
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        console.log(errorCode);
        const errorMessage = error.message;
        console.log(errorMessage);
        // The email of the user's account used.
        const email = error.customData.email;
        console.log(email);
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(credential);
        // ...
      });
  });
  registerhref.addEventListener('click', () => onNavigate('/register'));
  return container;
};
