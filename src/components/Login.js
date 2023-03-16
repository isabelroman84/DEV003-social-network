import { showMessage } from '../helpers/templates.js';
import { authGoogle, authUser, loginEmail } from '../lib/serviceAuth.js';

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
  // labelPassword.classList.add('colorcito');
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
  inputEmail.name = 'email';
  inputEmail.autocomplete = 'off';
  inputPassword.type = 'password';
  labelPassword.textContent = 'Contraseña';
  inputPassword.placeholder = '**************';
  inputPassword.name = 'password';
  inputPassword.autocomplete = 'off';
  buttonLogin.textContent = 'Ingresar';
  buttonLogin.type = 'submit';
  buttonGoogle.textContent = 'Ingresar con Google';
  register.textContent = '¿Aún no tienes una cuenta?';
  registerhref.setAttribute('href', '/register');
  registerhref.textContent = 'Regístrate';
  buttonGoogle.src = '../assets/img/google_2x.png';

  // Asignando padres e hijos
  divLine.appendChild(line);
  form.append(labelEmail, inputEmail, labelPassword, inputPassword, buttonLogin);
  form.append(divLine, buttonGoogle, register);
  register.appendChild(registerhref);
  divForm.appendChild(form);
  container.append(divForm);

  // Asignando funcionalidad
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailUser = form.email.value;
    const passwordUser = form.password.value;
    // console.log(emailUser, passwordUser);

    if (emailUser === '' || passwordUser === '') {
      showMessage('Completa tus datos');
    } else if (emailUser && passwordUser) {
      loginEmail(emailUser, passwordUser)
        .then((userCredential) => {
          const userAuth = userCredential.user;
          localStorage.setItem('user', JSON.stringify(userAuth));

          authUser(userAuth);
          // No puedo ver en consola, veo que está logueado por console de serviceAuth
          if (!userAuth.emailVerified) {
            showMessage('Por favor verifica el email');
            // sin el return permite almacenar mensajes vacíos
            return;
          }
          onNavigate('/wall');
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode === 'auth/invalid-email') {
            showMessage('La contraseña es incorrecta');
          } else if (errorCode === 'auth/email-already-exists') {
            showMessage('El email ya está en uso');
          }
        });
    }
  });

  buttonGoogle.addEventListener('click', () => {
    authGoogle()
      .then((result) => {
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      // console.log(token);
        const user = result.user;
        console.log('autenticado Google', user);
        localStorage.setItem('user', JSON.stringify(user));
        onNavigate('/wall');

        // alert('Por favor verifica el email');
      }).catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        // const errorMessage = error.message;
        // console.log(errorMessage);
        // // The email of the user's account used.
        // const email = error.customData.email;
        // console.log(email);
        // // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // console.log(credential);
        // ...
      });
  });
  registerhref.addEventListener('click', () => onNavigate('/register'));

  return container;
};
