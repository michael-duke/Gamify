import './style.css';
import 'tw-elements';

import GameList from './modules/gameList';
import renderTrailers from './modules/trailers';
import renderGames from './modules/games';
import renderContact from './modules/contact';

const gameList = new GameList();

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
const content = document.getElementById('content');

const renderPage = (location, page) => {
  location.innerHTML = '';
  page();
};

const removeActive = () => {
  tabLinks.forEach((link) => {
    if (link.classList.contains('active')) {
      link.classList.remove('active');
    }
  });
};

tabLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    const { target } = e;
    if (target.textContent.slice(0, 5) === 'Games') {
      removeActive();
      target.classList.add('active');
      renderPage(content, renderGames);
      gameList.loadGames();
    }

    if (target.textContent === 'Trailers') {
      removeActive();
      target.classList.add('active');
      renderPage(content, renderTrailers);
    }

    if (target.textContent === 'Contact') {
      removeActive();
      e.target.classList.add('active');
      renderPage(content, renderContact);
    }
  });
});

renderPage(content, renderGames);
gameList.loadGames();