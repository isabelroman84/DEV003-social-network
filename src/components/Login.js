import { login } from '../lib/service';

export const Login = (onNavigate) => {
  // Creando estructura
  const divContainer = document.createElement('div');
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
  logo.src = '../assets/imagenes/city-neg.png';
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

  // Agregando con append
  divForm.appendChild(form);
  form.append(labelEmail, inputEmail, labelPassword, inputPassword, buttonLogin);
  divContainer.append(divHeader, divForm, buttonGoogle, register, registerhref);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = inputEmail.value;
    const password = inputPassword.value;
    // console.log(email, password);

    // recibe 3 parámetros: mi configuración auth que la traje de firebase, email y password
    // como esto toma tiempo se puede usar la promesa .then
    // firebase espera que creemos una contraseña con 6 caracteres como mínimo, se consideran
    // los errores con try catch

    login(email, password)
    // console.log(userCredentials)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        onNavigate('/wall');
        console.log(user);
      })

      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/wrong-password') {
          alert('Password incorrecto');
        }
        console.log(error);
        console.log(errorCode);
        const errorMessage = error.message;
        console.log(errorMessage);
      // ..
      });
  });

  // buttonLogin.addEventListener('click', () => {
  //   onNavigate('/wall');
  // });

  return divContainer;
};
