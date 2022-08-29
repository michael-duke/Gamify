import './style.css';
import 'tw-elements';

import GameList from './modules/gameList';

const gameList = new GameList();
gameList.loadGames()