import logoImg from '../assets/img/citi-pq.png';

export function Header() {
  const header = document.createElement('div');
  const logo = document.createElement('img');
  header.classList.add('header');
  logo.classList.add('logo');
  logo.src = logoImg;
  header.appendChild(logo);
  //   tiene que retornar el elemento del DOM para después mandarlo llamar
  return header;
}
