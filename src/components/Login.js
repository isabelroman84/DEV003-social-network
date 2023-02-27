import Toastify from 'toastify-js';
import { login } from '../lib/service';

export const Login = (onNavigate) => {
  // Creando estructura
  const divContainer = document.createElement('div');
  const divLogo = document.createElement('div');
  const divHeader = document.createElement('div');
  const logo = document.createElement('img');
  const divForm = document.createElement('div');
  const form = document.createElement('form');
  // const divLogin = document.createElement('div');
  const labelEmail = document.createElement('label');
  const inputEmail = document.createElement('input');
  const labelPassword = document.createElement('label');
  const inputPassword = document.createElement('input');
  const buttonLogin = document.createElement('button');
  const divGmail = document.createElement('div');
  const buttonGoogle = document.createElement('button');
  const register = document.createElement('p');
  const registerhref = document.createElement('a');

  // Asignando clases
  divContainer.classList.add('divContainer');
  divLogo.classList.add('divLogo');
  divHeader.classList.add('divHeader');
  logo.classList.add('logo');
  divForm.classList.add('divForm');
  // divLogin.classList.add('divLogin');
  labelEmail.classList.add('labelEmail');
  labelPassword.classList.add('labelPassword');
  buttonLogin.classList.add('buttonLogin');
  divGmail.classList.add('divGmail');
  buttonGoogle.classList.add('buttonGoogle');
  register.classList.add('register');

  // Dando contenido a los elementos
  divHeader.appendChild(logo);
  logo.src = '../assets/imagenes/citi-pq.png';
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

  // Asignando padres e hijos
  divHeader.appendChild(logo);
  divForm.appendChild(form);
  form.append(labelEmail, inputEmail, labelPassword, inputPassword, buttonLogin);
  divContainer.append(divLogo, divHeader, divForm, buttonGoogle, register, registerhref);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailValue = inputEmail.value;
    const passwordValue = inputPassword.value;
    // console.log(email, password);
    if (emailValue === '' || passwordValue === '') {
      Toastify({
        text: 'Completa el campo',
        duration: 700,
        style: {
          background: 'linear-gradient(to right, #f2a71b, #bf522a)',
        },
      }).showToast();
    } else if (emailValue && passwordValue) {
      login(emailValue, passwordValue)
        .then((userCredential) => {
          const user = userCredential.user;
          onNavigate('/wall');
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode === 'auth/invalid-email') {
            Toastify({
              text: 'Correo no válido',
              duration: 700,
              style: {
                background: 'linear-gradient(to right, #f2a71b, #bf522a)',
              },
            }).showToast();
          } else if (errorCode === 'auth/wrong-password') {
            Toastify({
              text: 'Contraseña incorrecta',
              duration: 700,
              style: {
                background: 'linear-gradient(to right, #f2a71b, #bf522a)',
              },
            }).showToast();
          }
        });
    }
  });
  registerhref.addEventListener('click', () => onNavigate('/register'));
  return divContainer;
};
