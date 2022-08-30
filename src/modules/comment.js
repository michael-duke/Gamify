export default class Comment {
  constructor() {
    this.user = null;
    this.comment = null;
    this.url = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/';
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
      `${this.url}${this.id}/comments?item_id=${gameID}`,
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
  }
}
