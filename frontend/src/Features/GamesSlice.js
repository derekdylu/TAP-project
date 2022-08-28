import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: '-1', cuisine: [], cart: [], grocery: [], score: 0}
]

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    gameAdded(state, action) {
      state.push(action.payload)
    },
    prepare(id) {
      return {
        payload: {
          id,
          cuisine: [],
          cart: [],
          grocery: [],
          score: 0
        }
      }
    }
  },
})

export const selectAllGames = (state) => state.games

// TODO select only one game? and update it's cuisine, cart, grocery and score (maybe we don't need score since it will send back to backend?)

export const {gameAdded} = gamesSlice.actions

export default gamesSlice.reducer