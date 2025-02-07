export const Welcome = (onNavigate) => {
  // Creando estructura
  const container = document.createElement('div');
  const divText = document.createElement('div');
  const textW = document.createElement('h2');
  const buttonWelcome = document.createElement('button');

  // Asignando clases
  container.classList.add('container');
  divText.classList.add('div-text');
  textW.classList.add('text-w');
  buttonWelcome.classList.add('btn-w');

  // Dando contenido a los elementos
  textW.textContent = 'Has llegado al mejor lugar para informarte de los principales eventos de tu ciudad';
  buttonWelcome.textContent = 'HOLA';

  // Asignando padres e hijos
  divText.append(textW, buttonWelcome);
  container.append(divText);

  buttonWelcome.addEventListener('click', () => {
    onNavigate('/login');
  });

  return container;
};
