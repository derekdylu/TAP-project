import { configureStore } from '@reduxjs/toolkit';
import gamesReducer from '../Features/GamesSlice';

export default configureStore({
  reducer: {
    games: gamesReducer,
  }
})