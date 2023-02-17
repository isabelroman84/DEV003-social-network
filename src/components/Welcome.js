export const Welcome = (onNavigate) => {
  const div = document.createElement('div');
  div.classList.add('fondo');

  const logo = document.createElement('img');
  logo.src = '../assets/imagenes/logo2.png';

  const title = document.createElement('h2');
  const buttonWelcome = document.createElement('button');

  buttonWelcome.textContent = 'Bienvenido';
  title.textContent = 'Eventos a un clic';

  buttonWelcome.addEventListener('click', () => {
    onNavigate('/login');
  });

  div.append(logo, title, buttonWelcome);

  return div;
};
