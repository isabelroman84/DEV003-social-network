import Toastify from 'toastify-js';
// estas son las constantes para poder interactuar con la API que va a permitir
// consumir los datos a la SPA (esto es lo que necesitamos consultar)
// message es lo que se va a mostrar y type es para que determine si es un error
export function showMessage(message) {
  Toastify({
    text: message,
    duration: 3000,
    style: {
      // background: type === 'success' ? '#49BF9E' : 'linear-gradient(to right, #F24495, #F2BC57)',
      // background: 'linear-gradient(to right, #F24495, #F2BC57)',
      background: 'linear-gradient(to right, #49BF9E, #F2BC57)',
    },
  }).showToast();
}

// export function showMessage(message, element) {
//   const divError = document.createElement('div');
//   const alertError = document.createElement('p');

//   divError.classList.add('div-error');
//   alertError.classList.add('message');

//   alertError.innerHTML = message;

//   divError.appendChild(alertError);
//   divError.insertAdjacentElement('beforeend', element);

//   return alertError;
// }
