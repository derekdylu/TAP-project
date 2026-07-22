import cuisines from '../data/cuisine.json';
import ingredientTypes from '../data/ingredient_type.json';
import ingredients from '../data/ingredient.json';

const GAME_PREFIX = 'tap-archive-game:';
const COMMENT_KEY = 'tap-archive-comments';
const FARTHEST_DISTANCE_KM = 374.36;

const clone = (value) => JSON.parse(JSON.stringify(value));

const getStorage = () => {
  if (typeof window === 'undefined' || !window.localStorage) {
    throw new Error('This archival build requires browser local storage.');
  }

  return window.localStorage;
};

const gameKey = (id) => `${GAME_PREFIX}${id}`;

const createId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const readGame = (id) => {
  const serialized = getStorage().getItem(gameKey(id));

  if (!serialized) {
    throw new Error(`Archived game ${id} was not found in this browser.`);
  }

  return JSON.parse(serialized);
};

const writeGame = (game) => {
  getStorage().setItem(gameKey(game.id), JSON.stringify(game));
  return clone(game);
};

export const getComments = async () => {
  const serialized = getStorage().getItem(COMMENT_KEY);
  return serialized ? JSON.parse(serialized) : [];
};

export const createComment = async (
  nickname,
  profilePhoto,
  content,
  score,
  timestamp,
) => {
  const comments = await getComments();
  const comment = {
    id: createId(),
    nickname: String(nickname).slice(0, 40),
    profile_photo: String(profilePhoto),
    content: String(content ?? '').slice(0, 500),
    score: Number(score) || 0,
    timestamp: String(timestamp),
  };

  comments.push(comment);
  getStorage().setItem(COMMENT_KEY, JSON.stringify(comments.slice(-100)));
  return clone(comment);
};

export const getCuisines = async () => clone(cuisines);

export const getCuisineById = async (id) => (
  clone(cuisines.find((cuisine) => cuisine.id === Number(id)) ?? null)
);

export const getCuisineByIngredient = async (id) => (
  cuisines
    .filter((cuisine) => cuisine.required_ingredient_types.includes(Number(id)))
    .map((cuisine) => cuisine.id)
);

export const getGames = async () => {
  const storage = getStorage();
  const games = [];

  for (let index = 0; index < storage.length; index += 1) {
    const key = storage.key(index);
    if (key?.startsWith(GAME_PREFIX)) {
      games.push(JSON.parse(storage.getItem(key)));
    }
  }

  return clone(games);
};

export const getGameById = async (id) => clone(readGame(id));

export const createGame = async (cuisine = [], cart = [], grocery = [], score = 0) => {
  const game = {
    id: createId(),
    cuisine: clone(cuisine),
    cart: clone(cart),
    grocery: clone(grocery),
    score: Number(score) || 0,
  };

  return writeGame(game);
};

export const updateGameById = async (
  id,
  cuisine = null,
  cart = null,
  grocery = null,
  score = null,
) => {
  const game = readGame(id);

  if (cuisine !== null) game.cuisine = clone(cuisine);
  if (cart !== null) game.cart = clone(cart);
  if (grocery !== null) game.grocery = clone(grocery);
  if (score !== null) game.score = Number(score) || 0;

  return writeGame(game);
};

export const deleteGameById = async (id) => {
  getStorage().removeItem(gameKey(id));
  return { deleted: true };
};

export const putGroceryById = async (id) => {
  const game = readGame(id);
  const grocery = game.cuisine.flatMap((cuisineId) => {
    const cuisine = cuisines.find((candidate) => candidate.id === Number(cuisineId));
    return cuisine?.required_ingredient_types ?? [];
  });

  game.grocery = [...new Set(grocery)];
  return writeGame(game);
};

export const getScoreById = async (id) => {
  const game = readGame(id);
  const requiredTypes = game.grocery
    .map((typeId) => ingredientTypes.find((type) => type.id === Number(typeId)))
    .filter(Boolean);
  const divisor = Math.max(requiredTypes.length, 1);
  const currentMonth = new Date().getMonth() + 1;

  let safety = 0;
  let transparency = 0;
  let emission = 0;
  let season = 0;

  requiredTypes.forEach((requiredType) => {
    const item = game.cart.find((candidate) => candidate.type === requiredType.name);
    if (!item) return;

    const catalogItem = ingredients.find((candidate) => candidate.id === item.id) ?? item;
    const itemScore = catalogItem.score ?? [0, 0, FARTHEST_DISTANCE_KM, []];
    const distance = Math.min(Number(itemScore[2]) || FARTHEST_DISTANCE_KM, FARTHEST_DISTANCE_KM);
    const months = Array.isArray(itemScore[3]) ? itemScore[3] : [];

    safety += Number(itemScore[0]) || 0;
    transparency += Number(itemScore[1]) || 0;
    emission += FARTHEST_DISTANCE_KM - distance;
    if (months.includes(0) || months.includes(currentMonth)) season += 1;
  });

  const safetyScore = Math.round((safety / divisor) * 25);
  const transparencyScore = Math.round((transparency / divisor) * 25);
  const emissionScore = Math.round((emission / (divisor * FARTHEST_DISTANCE_KM)) * 25);
  const seasonScore = Math.round((season / divisor) * 25);
  const totalScore = safetyScore + transparencyScore + emissionScore + seasonScore;

  game.score = totalScore;
  writeGame(game);

  return [totalScore, safetyScore, transparencyScore, emissionScore, seasonScore];
};

export const getIngredients = async () => clone(ingredients);

export const getIngredientById = async (id) => (
  clone(ingredients.find((ingredient) => ingredient.id === String(id)) ?? null)
);

export const getIngredientTypes = async () => clone(ingredientTypes);

export const getIngredientTypeById = async (id) => (
  clone(ingredientTypes.find((ingredientType) => ingredientType.id === Number(id)) ?? null)
);
