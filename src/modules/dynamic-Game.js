import Comment from './comment';
import Like from './like';

const comment = new Comment();
const like = new Like();
export default class DynamicGame {
  renderCards = async (games) => {
    const gameCounter = document.getElementById('game-counter');
    gameCounter.textContent = ` (${this.gameCounter(games)})`;

    const gamesHolder = document.querySelector('.game-list');
    gamesHolder.innerHTML = '';

    games.forEach(async (game) => {
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
      likeDiv.classList = 'w-12 flex items-center gap-2';

      const likeBtn = document.createElement('button');
      likeBtn.classList =
        'like-btn flex flex-col justify-center items-center relative p-1 w-fit text-white font-medium leading-tight rounded-full uppercase hover:bg-red-400 hover:border  hover:shadow-lg active:shadow-lg transition-colors duration-150 ease-in-out';
      likeBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 stroke-gamify-black">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
      <div class="tooltip">Like</div> `;
      likeBtn.onclick = () => like.onLike(id);

      const likeCounter = document.createElement('span');
      likeCounter.id = `like-counter-${id}`;
      likeCounter.innerText = await like.getLikes(id);

      likeDiv.append(likeBtn, likeCounter);

      cardAction.append(commentDiv, likeDiv);
      cardInfo.append(thumbnailAnchor, cardDesc, cardAction);
      card.appendChild(cardInfo);
      gamesHolder.appendChild(card);
    });
  };

  gameCounter = (games) => games.length;

  rendePopup = async (id) => {
    const modal = document.getElementById('modal');

    await this.renderGame(id);
    await comment.renderComments(id);

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

    const response = await fetch(url, options);
    const game = await response.json();

    const gameInfo = document.getElementById('game-info');
    gameInfo.innerHTML = '';

    const {
      title,
      description,
      thumbnail: gameImage,
      game_url: link,
      genre,
      platform,
      release_date: date,
      minimum_system_requirements: sysReq,
      screenshots,
    } = game;

    const gameTitle = document.createElement('a');
    gameTitle.classList =
      'font-semibold text-2xl mb-3 hover:underline decoration-gamify-red decoration-4 underline-offset-8 cursor-pointer';
    gameTitle.innerText = title;
    gameTitle.href = link;
    gameTitle.target = '_blank';

    const thumbnail = document.createElement('img');
    thumbnail.classList = 'px-12 rounded-md object-cover';
    thumbnail.src = gameImage;

    if (screenshots.length !== 0) {
      const { image } =
        screenshots[Math.floor(Math.random() * screenshots.length)];
      thumbnail.src = image;
    }

    const gameDesc = document.createElement('p');
    gameDesc.classList = 'game-desc p-12';
    gameDesc.textContent = description;

    const gameDetail = document.createElement('div');
    gameDetail.classList = 'self-start pl-12';

    const tag = document.createElement('h3');
    tag.classList = 'font-semibold text-xl flex items-center';
    tag.insertAdjacentHTML(
      'beforeend',
      `
    &#8227; Genre : <span class="ml-2 text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-sky-500 text-white rounded-full">${genre}</span>
    `
    );

    const gamePlatform = document.createElement('h3');
    gamePlatform.classList = 'font-semibold text-xl';
    gamePlatform.insertAdjacentHTML(
      'beforeend',
      `
    &#8227; Platform : <span class="align-middle text-xs py-1.5 px-2.5 leading-none text-center whitespace-nowrap font-bold bg-amber-600 text-white rounded">${platform}</span>
    `
    );
    const releaseDate = document.createElement('h3');
    releaseDate.classList = 'font-semibold text-xl';
    releaseDate.insertAdjacentHTML(
      'beforeend',
      `
    &#8227; Release Date : <span class="align-middle text-xs py-1.5 px-2.5 leading-none text-center whitespace-nowrap font-bold bg-slate-500 text-white rounded">${date}</span>
    `
    );

    const minHeader = document.createElement('span');
    minHeader.classList =
      'px-4 py-2 mt-3 mb-1 rounded-full text-gray-500 bg-gray-200 font-semibold text-md flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease';
    minHeader.innerText = 'Minimum Requirements';

    const minimumReqOl = document.createElement('ol');
    minimumReqOl.classList = 'list-disc ml-3';
    minimumReqOl.insertAdjacentHTML('beforeend', '<span> None 😁Enjoy Online');
    if (sysReq) {
      minimumReqOl.innerHTML = '';
      const requirements = Object.keys(sysReq);

      requirements.forEach((requirement) => {
        const li = document.createElement('li');
        li.classList = '';
        li.innerText = `${requirement} : ${sysReq[requirement]}`;
        minimumReqOl.appendChild(li);
      });
    }

    gameDetail.append(tag, gamePlatform, releaseDate, minHeader, minimumReqOl);
    gameInfo.append(gameTitle, thumbnail, gameDesc, gameDetail);
  };
}
