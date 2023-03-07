import { Welcome } from './components/Welcome.js';
import { Register } from './components/Register.js';
import { Login } from './components/Login.js';
import { Wall } from './components/Wall.js';
import { Header } from './components/Header.js';

const root = document.getElementById('root');

const routes = {
  '/': Welcome,
  '/register': Register,
  '/login': Login,
  '/wall': Wall,
};

// Creando una función que recibe paths
// Este método toma el nombre de la ruta(pathname) y la renderiza según lo que indique routes
// Con el método pushState() se agrega una entrada a la pila del historial y tiene 3 parámetros
export const onNavigate = (pathname) => {
  window.history.pushState(
    {},
    pathname,
    window.location.origin + pathname,
  );

  // Borrando el primer nodo para dar espacio a uno nuevo
  // root.removeChild(root.firstChild);
  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }

  root.appendChild(Header());
  root.appendChild(routes[pathname](onNavigate)); // () para que se ejecute
};

root.appendChild(Header());
root.appendChild(routes[window.location.pathname](onNavigate));

// Regresando a vista anterior con evento postate que toma info de history.pushstate()
window.onpopstate = () => {
  // root.removeChild(root.firstChild);
  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }
  root.appendChild(Header());
  root.append(routes[window.location.pathname](onNavigate));
};
