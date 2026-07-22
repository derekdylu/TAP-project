import {
  createComment,
  createGame,
  getComments,
  getGameById,
  getScoreById,
  putGroceryById,
  updateGameById,
} from './Utils/Axios';

describe('archival browser data adapter', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test('keeps game state entirely in local storage', async () => {
    const game = await createGame([0], [], [], 0);
    await putGroceryById(game.id);
    await updateGameById(game.id, null, [{ id: '0_1', type: '豬肉' }]);

    const storedGame = await getGameById(game.id);
    expect(storedGame.cuisine).toEqual([0]);
    expect(storedGame.grocery).toEqual([2, 0, 4, 6]);
    expect(storedGame.cart).toEqual([{ id: '0_1', type: '豬肉' }]);
  });

  test('scores incomplete carts safely instead of crashing', async () => {
    const game = await createGame([0], [], [], 0);
    await putGroceryById(game.id);

    const emptyScore = await getScoreById(game.id);
    expect(emptyScore).toEqual([0, 0, 0, 0, 0]);

    await updateGameById(game.id, null, [{ id: '0_1', type: '豬肉' }]);
    const partialScore = await getScoreById(game.id);
    expect(partialScore[0]).toBeGreaterThan(0);
    expect(partialScore[0]).toBeLessThanOrEqual(100);
  });

  test('stores only local display fields for comments', async () => {
    await createComment('archivist', '1', 'local note', 72, 1234567890, {
      survey: 'must not be stored',
    }, 'must-not-be-stored@example.invalid');

    const comments = await getComments();
    expect(comments).toHaveLength(1);
    expect(comments[0]).toMatchObject({
      nickname: 'archivist',
      content: 'local note',
      score: 72,
    });
    expect(comments[0]).not.toHaveProperty('email');
    expect(comments[0]).not.toHaveProperty('answer');
  });
});
