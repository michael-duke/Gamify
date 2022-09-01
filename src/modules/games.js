const content = document.getElementById('content');

const games = `
<div class="game-list mt-12 grid gap-4">
    <!-- Generated -->
</div>
`;

const renderGames = () => {
  content.insertAdjacentHTML('beforeend', games);
};

export default renderGames;
