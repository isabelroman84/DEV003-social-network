import Toastify from 'toastify-js';
// estas son las constantes para poder interactuar con la API que va a permitir
// consumir los datos a la SPA (esto es lo que necesitamos consultar)
// message es lo que se va a mostrar y type es para que determine si es un error
export function showMessage(message) {
  Toastify({
    text: message,
    duration: 5000,
    style: {
      // background: type === 'success' ? '#49BF9E' : 'linear-gradient(to right, #F24495, #F2BC57)',
      background: 'linear-gradient(to right, #F24495, #F2BC57)',
    },
  }).showToast();
}
