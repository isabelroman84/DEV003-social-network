import { welcome } from './components/welcome.js'
// variable que accede al nodo que se creo en index, llamado "root" //
const root = document.getElementById ('root');
const routes = {
'/': welcome
};

root.appendChild(welcome());


