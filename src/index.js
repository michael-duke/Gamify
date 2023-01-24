import './style.css';
import 'tw-elements';

import GameList from './modules/gameList';
import { toggleActiveLink, singlePageNav } from './modules/spa-navigation';
import renderTrailers from './modules/trailers';
import renderGames from './modules/games';
import renderContact from './modules/contact';

const gameList = new GameList();

gameList.loadGames();

const renderPage = (page) => {
  page();
};

renderPage(renderGames);
renderPage(renderTrailers);
renderPage(renderContact);

// Modal Action
const modal = document.getElementById('modal');
modal.onclick = (e) => {
  const {
    target: { nodeName },
  } = e;
  if (nodeName === 'ARTICLE') {
    modal.classList.remove('scale-100');
    modal.classList.add('scale-0');
  }
};

const closebutton = document.getElementById('closebutton');
closebutton.onclick = () => {
  modal.classList.add('scale-0');
  modal.classList.remove('scale-100');
};

// Nav Action
const tabLinks = document.querySelectorAll('.nav-link');

tabLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    const { target } = e;
    if (target.textContent.slice(0, 5) === 'Games') {
      toggleActiveLink();
      singlePageNav();
    }

    if (target.textContent === 'Trailers') {
      toggleActiveLink();
      singlePageNav();
    }

    if (target.textContent === 'Contact') {
      toggleActiveLink();
      singlePageNav();
    }
  });
});
