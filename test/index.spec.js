// importamos la funcion que vamos a testear
// import Toastify from 'toastify-js';
import { Register } from '../src/components/Register.js';
// import { registerUser } from '../src/lib/serviceAuth.js';

describe('test de registerUser', () => {
  it('debería mostrar un error', () => {
    Register();
  });
});
