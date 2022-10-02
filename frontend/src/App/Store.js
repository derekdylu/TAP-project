import { configureStore } from '@reduxjs/toolkit';
import GamesReducer from '../Features/GamesSlice';
import PagesReducer from '../Features/PagesSlice';
import PlayingsReducer from '../Features/PlayingsSlice';

export default configureStore({
  reducer: {
    games: GamesReducer,
    pages: PagesReducer,
    playings: PlayingsReducer,
  }
})