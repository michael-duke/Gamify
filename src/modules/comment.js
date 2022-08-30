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
    const {status} = await comment;
    console.log(status);
  };

  getComments = async (gameID) => {
    const commment = await fetch(
      `${this.url}${this.id}/comments?item_id=${gameID}`
    );
    const response = await commment.json();
    console.log(response);
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

      const obj = { item_id: `${gameID}`, username: name, comment: comment };

      this.postComment(obj);

      userName.value = '';
      userComment.value = '';
    }

    //return {name, comment};
  }
}
