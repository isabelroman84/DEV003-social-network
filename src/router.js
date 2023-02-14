
import {Welcome} from './components/Welcome.js';
import {Enter} from './components/Enter.js';
import{Login} from './components/Login.js';
import {Register} from './components/Register.js';

const root = document.getElementById('root');
const routes = {
    '/': Welcome,
    '/enter': Enter,
    '/login': Login,
    '/register': Register,
};

export const onNavigate = (pathname) => {
    window.history.pushState(
        {},
        pathname,
        window.location.origin+pathname,
    );
    
root.removeChild(root.firstChild);

root.appendChild(routes[pathname]());

};

const component = routes[window.location.pathname];

root.appendChild(component(onNavigate));

window.onpopstate = () => {

root.appendChild(routes[window.location.pathname]);
};