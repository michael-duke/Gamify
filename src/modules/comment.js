export default class Comment {
  constructor() {
    this.user = null;
    this.comment = null;
    this.url =
      'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/';
    this.id = '22Ab6ceHbnol5078nhbR';
  }

  postComment = async (comment) => {
    await fetch(`${this.url}${this.id}/comments`, {
      method: 'POST',
      body: JSON.stringify(comment),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });
  };

  getComments = async (gameID) => {
    const response = await fetch(
      `${this.url}${this.id}/comments?item_id=${gameID}`
    );
    const { status } = response;
    const comments = await response.json();

    if (status === 400) {
      return 'No comments on this game yet. 😄 Be the first';
    }

    return comments;
  };

  getInput = async (gameID) => {
    const userName = document.getElementById('user-name');
    const userComment = document.getElementById('user-comment');

    const { value: name } = userName;
    const { value: comment } = userComment;

    if (name.trim().length > 0 && comment.length > 0) {
      this.user = name;
      this.comment = comment;

      const newComment = {
        item_id: gameID,
        username: name,
        comment,
      };

      await this.postComment(newComment);

      await this.renderComments(gameID);

      userName.value = '';
      userComment.value = '';
    }
  };

  renderComments = async (id) => {
    const gameComments = await this.getComments(id);

    const commentDisplay = document.querySelector('.comment-display');
    commentDisplay.innerHTML = '';
    const commentCounter = document.querySelector('.comment-counter');
    commentCounter.textContent = `Comments (${this.commentCounter(
      gameComments
    )})`;

    if (Array.isArray(gameComments)) {
      gameComments.forEach((gamecomment) => {
        const { comment, creation_date: date, username } = gamecomment;

        const user = document.createElement('span');
        user.classList = 'font-semibold ml-3';
        user.textContent = `${username} :`;

        const reply = document.createElement('span');
        reply.classList = 'text-gray-600 italic ml-3';
        reply.textContent = comment;

        const postDate = document.createElement('span');
        postDate.classList =
          'text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-gray-200 text-gray-700 rounded';
        postDate.textContent = date;

        const commentContainer = document.createElement('h3');
        commentContainer.classList = 'flex mt-2';
        commentContainer.append(postDate, user, reply);

        commentDisplay.appendChild(commentContainer);
      });
    } else {
      const message = document.createElement('h3');
      message.textContent = gameComments;
      commentDisplay.appendChild(message);
    }
  };

  commentCounter = (games) => (Array.isArray(games) ? games.length : 0);
}
