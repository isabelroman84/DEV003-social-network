export const welcome = () =>{
const div = document.createElement('div');
const buttonLogin = document.createElement('button');
const buttonRegister = document.createElement('button');

buttonLogin.textContent= 'Inicia Sesion';
buttonRegister.textContent= 'Registrate';

div.append(buttonLogin,buttonRegister);

return div;


};