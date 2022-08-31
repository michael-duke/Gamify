export default class Like {
  constructor() {
    this.url = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/';
    this.id = '22Ab6ceHbnol5078nhbR';
  }

  postLike = async (like) => {
    await fetch(`${this.url}${this.id}/likes`, {
      method: 'POST',
      body: JSON.stringify(like),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });
  };

  getLikes = async (id) => {
    const response = await fetch(`${this.url}${this.id}/likes`);
    const bulkLikes = await response.json();

    const gameLikes = bulkLikes.filter(({ item_id: gameID }) => gameID === id)[0]
    || { likes: 0, item_id: id };
    const { likes } = gameLikes;
    return likes;
  };

  onLike = async (gameID) => {
    const newLike = {
      item_id: gameID,
    };

    await this.postLike(newLike);
    const likes = await this.getLikes(gameID);

    const likeCounter = document.getElementById(`like-counter-${gameID}`);
    likeCounter.innerHTML = '';
    likeCounter.innerText = likes;
  };
}
