import DynamicGame from './dynamic-Game';
const dynamicGame = new DynamicGame();

export default class GameList {
  constructor() {
    this.games = [];
    this.url = 'https://free-to-play-games-database.p.rapidapi.com/api/games';
  }

  loadGames = async () => {
    this.games = await this.fetchGameList();
    dynamicGame.renderCards(this.games);
  };

  fetchGameList = async () => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
        'X-RapidAPI-Key': '453f81df11mshba8fa41bb162304p159da5jsn21e417a6277a',
      },
    };

    const gameData = await fetch(`${this.url}`, options);

    const games = await gameData.json();
    return games.slice(0, 21);
  };
}
