import './style.css';
import 'tw-elements';

import GameList from './modules/gameList';

const gameList = new GameList();
gameList.loadGames();

// Modal Action
const modal = document.getElementById('modal');
modal.onclick = (e) => {
  const { target: { nodeName } } = e;
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