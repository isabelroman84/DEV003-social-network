// importamos la funcion que vamos a testear
// import Toastify from 'toastify-js';
import { Login } from '../src/components/Login.js';
import { showMessage } from '../src/helpers/templates.js';
// import { Wall } from '../src/components/Wall';

jest.mock('../src/helpers/templates.js', () => ({ showMessage: jest.fn() }));

describe('Login', () => {
  it('debería ser una función', () => {
    expect(typeof Login).toBe('function');
  });

  it('el formulario de login se renderice correctamente', () => {
    // GIVEN - DADO: contexto necesario para realizar la prueba (elementos en body, mocks...)
    const divRoot = document.createElement('div');
    divRoot.id = 'root';

    // WHEN - CUANDO: Ejectuar¨el cdigo que qiero probar
    divRoot.appendChild(Login(() => {}));

    document.body.append(divRoot);

    const formLogin = document.querySelector('[data-testid="login-form"]');
    // selectionar el input de email
    // selectionar el input de password
    // selectionar el boton de login/ingresar

    // THEN - ENTONCES:¨expects, evalyuar el resultado

    expect(formLogin).not.toBeNull();
    // asegurarme que el input de email este en pantalla
    // asegurarme que el input de password este en pantalla
    // asegurarme que el boton de login/ingresar este en pantalla
    console.log(document.body.innerHTML);
  });
  it('al dar click al login si no hay valores en el iput aparece un error', () => {
    const divRoot = document.createElement('div');
    divRoot.id = 'root';
    divRoot.appendChild(Login(() => {}));
    document.body.append(divRoot);
    const buttonLogin = document.querySelector('button');
    buttonLogin.click();

    expect(showMessage).toHaveBeenCalled();
    console.log(showMessage);
  });
});
