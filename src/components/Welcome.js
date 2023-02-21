export const Welcome = (onNavigate) => {
  const divWelcome = document.createElement('div');
  const divLogo = document.createElement('div');
  const logo = document.createElement('img');
  const divFondo = document.createElement('div');
  const textW = document.createElement('h2');
  const buttonWelcome = document.createElement('button');

  divLogo.classList.add('divLogo');
  logo.classList.add('logo');
  divFondo.classList.add('divFondo');
  textW.classList.add('textW');
  buttonWelcome.classList.add('buttonWelcome');

  logo.src = '../assets/imagenes/citi-pq.png';
  textW.textContent = 'Haz llegado al mejor lugar para informarte de los principales eventos de tu ciudad';
  buttonWelcome.textContent = 'HOLA';

  divLogo.append(logo);
  divWelcome.append(divLogo, textW, buttonWelcome);

  buttonWelcome.addEventListener('click', () => {
    onNavigate('/login');
  });

  return divWelcome;
};
