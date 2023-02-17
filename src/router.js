import { Welcome } from './components/Welcome.js';
import { Login } from './components/Login';
import { Wall } from './components/Wall';
import { Register } from './components/Register.js';

const root = document.getElementById('root');
const routes = {
  '/': Welcome,
  '/login': Login,
  '/wall': Wall,
  '/register': Register,
};

export const onNavigate = (pathname) => {
  window.history.pushState(
    {},
    pathname,
    window.location.origin + pathname,
  );

  root.removeChild(root.firstChild);

  root.appendChild(routes[pathname](onNavigate));
};

const component = routes[window.location.pathname];

root.appendChild(component(onNavigate));

window.onpopstate = () => {
  root.appendChild(routes[window.location.pathname](onNavigate));
};
