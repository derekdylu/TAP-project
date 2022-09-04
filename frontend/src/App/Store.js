import { configureStore } from '@reduxjs/toolkit';
import GamesReducer from '../Features/GamesSlice';
import PagesReducer from '../Features/PagesSlice';

export default configureStore({
  reducer: {
    games: GamesReducer,
    pages: PagesReducer,
  }
})