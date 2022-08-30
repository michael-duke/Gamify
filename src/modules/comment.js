export default class Comment {
  constructor() {
    this.user = null;
    this.comment = null;
    this.size = 0;
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

  getInput(gameID) {
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

      this.postComment(newComment);

      userName.value = '';
      userComment.value = '';
    }

    // return {name, comment};
  }
}
