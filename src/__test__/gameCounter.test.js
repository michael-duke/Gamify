const DynamicGame = require('../modules/dynamic-Game').default;

const dynamicGame = new DynamicGame();

describe('Game counter test', () => {
  it('gameCounter should return 5', () => {
    const mockGames = [
      {
        id: 12,
        title: 'Micro Kart',
      },
      {
        id: 23,
        title: 'Immortal 2',
      },
      {
        id: 212,
        title: 'Minecraft',
      },
      {
        id: 44,
        title: 'NFS | Heat',
      },
      {
        id: 305,
        title: 'Forge of Empire',
      },
    ];

    expect(dynamicGame.gameCounter(mockGames)).toBe(5);
  });

  it('gameCounter should return 0 when passed empty array', () => {
    const mockGames = [];
    expect(dynamicGame.gameCounter(mockGames)).toBe(0);
  });
});
