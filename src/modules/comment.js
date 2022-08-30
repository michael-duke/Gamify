export default class Comment {
  constructor() {
    this.user = null;
    this.comment = null;
    this.size = 0;
    this.url =
      'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/';
    this.id = '22Ab6ceHbnol5078nhbR';
  }

  postComment = async (data) => {
    // console.log(JSON.stringify(data));
    const comment = await fetch(`${this.url}${this.id}/comments`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });
    const { status } = comment;
    console.log(status);
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

  getInput(gameID) {
    const userName = document.getElementById('user-name');
    const userComment = document.getElementById('user-comment');

    const { value: name } = userName;
    const { value: comment } = userComment;

    if (name.trim().length > 0 && comment.length > 0) {
      this.user = name;
      this.comment = comment;
      this.size++;

      const obj = { item_id: gameID, username: name, comment: comment };

      this.postComment(obj);

      userName.value = '';
      userComment.value = '';
    }

    //return {name, comment};
  }
}
