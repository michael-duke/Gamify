import Comment from './comment';

const comment = new Comment();
export default class DynamicGame {
  renderCards(games) {
    const gameCounter = document.getElementById('game-counter');
    gameCounter.textContent = ` (${games.length})`;
    const gamesHolder = document.querySelector('.game-list');
    gamesHolder.innerHTML = '';

    games.forEach((game) => {
      const { id, title, short_description: desc, thumbnail } = game;

      const card = document.createElement('div');
      card.className = 'flex';

      const cardInfo = document.createElement('div');
      cardInfo.classList =
        'rounded-lg flex flex-col justify-between shadow-lg bg-white max-w-sm';

      const thumbnailAnchor = document.createElement('a');
      thumbnailAnchor.setAttribute('data-mdb-ripple', true);
      thumbnailAnchor.setAttribute('data-mdb-ripple-color', 'light');
      thumbnailAnchor.innerHTML = `<img class="rounded-t-lg w-full" src=${thumbnail} alt="image-${id}"/>`;

      const cardDesc = document.createElement('div');
      cardDesc.className = 'p-6';

      const gameTitle = document.createElement('h5');
      gameTitle.classList = 'text-gray-900 text-xl font-semibold mb-2';
      gameTitle.textContent = title;

      const gameDesc = document.createElement('p');
      gameDesc.classList = 'text-gray-700 text-base mb-4';
      gameDesc.textContent = desc;

      cardDesc.append(gameTitle, gameDesc);

      const cardAction = document.createElement('div');
      cardAction.classList =
        'action-bar flex justify-center w-full h-8 items-center py-8 gap-4';

      const commentDiv = document.createElement('div');
      commentDiv.classList = 'w-12';

      const commentBtn = document.createElement('button');
      commentBtn.classList =
        'comment-btn flex flex-col justify-center items-center relative p-1 w-fit text-white font-medium leading-tight rounded-full uppercase hover:bg-blue-200 hover:border  hover:shadow-lg active:shadow-lg transition-colors duration-150 ease-in-out';
      // commentBtn.setAttribute('@click', 'showModal1 = true');
      commentBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 stroke-gamify-black">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
      </svg>
      <div class="tooltip">Comment</div>`;
      commentBtn.onclick = () => this.rendePopup(id);

      commentDiv.appendChild(commentBtn);

      const likeDiv = document.createElement('div');
      likeDiv.classList = 'w-12';

      const likeBtn = document.createElement('button');
      likeBtn.classList =
        'like-btn flex flex-col justify-center items-center relative p-1 w-fit text-white font-medium leading-tight rounded-full uppercase hover:bg-red-400 hover:border  hover:shadow-lg active:shadow-lg transition-colors duration-150 ease-in-out';
      likeBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 stroke-gamify-black">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
      <div class="tooltip">Like</div> `;

      likeDiv.appendChild(likeBtn);

      cardAction.append(commentDiv, likeDiv);
      cardInfo.append(thumbnailAnchor, cardDesc, cardAction);
      card.appendChild(cardInfo);
      gamesHolder.appendChild(card);
    });
  }

  // Render the comments dynamically
  
  rendePopup = async (id) => {
    console.log(id);
    const modal = document.getElementById('modal');
    const gameDesc = modal.querySelector('.game-desc');
    gameDesc.textContent = `Game ID: ${id}`;

    const commentDisplay = document.querySelector('.comment-display');
    commentDisplay.innerHTML = '';
    const commentCounter = document.querySelector('.comment-counter');

    const gameComments = await comment.getComments(id);

    if (Array.isArray(gameComments)) {
      const counter = gameComments.length;
      commentCounter.textContent = `Comments (${counter})`;

      gameComments.forEach((gamecomment) => {
        const { comment, creation_date: date, username } = gamecomment;

        const user = document.createElement('span');
        user.textContent = username;

        const reply = document.createElement('span');
        reply.textContent = comment;

        const postDate = document.createElement('span');
        postDate.textContent = date;

        const commentContainer = document.createElement('h3');
        commentContainer.append(user, reply, postDate);

        commentDisplay.appendChild(commentContainer);
      });
    } else {
      const message = document.createElement('h3');
      message.textContent = gameComments;
      commentDisplay.appendChild(message);
      commentCounter.textContent = 'Comments (0)';
    }

    console.log(this.renderGame(id));

    const commentBtn = modal.querySelector('.add-comment');
    commentBtn.onclick = () => comment.getInput(id);
    modal.classList.remove('scale-0');
    modal.classList.add('scale-100');
  };

  renderGame = async (gameID) => {
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameID}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
        'X-RapidAPI-Key': '453f81df11mshba8fa41bb162304p159da5jsn21e417a6277a',
      },
    };

    const data = await fetch(url, options);
    const res = await data.json();
    return res;
  };
}
