import { authUser } from './lib/service.js';
import { Header } from './components/Header.js';
import { onNavigate } from './router.js';

const root = document.getElementById('root');

root.appendChild(Header());

onNavigate();
authUser();
