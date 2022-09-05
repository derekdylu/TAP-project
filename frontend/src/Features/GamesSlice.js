import { createSlice } from "@reduxjs/toolkit";

const initialState = []

const GamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    gameAdded: {
      reducer(state, action) {
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
    gameCuisineUpdated: {
      reducer(state, action) {
        const c = action.payload
        const game = state.find(x => x.id !== undefined)
        if(game) {
          game.cuisine = c
        }
      }
    },
    gameGroceryUpdated: {
      reducer(state, action) {
        const g = action.payload
        const game = state.find(x => x.id !== undefined)
        if(game) {
          game.cuisine = g
        }
      }
    },
    gameCartAdded: {
      reducer(state, action) {
        const i = action.payload
        const game = state.find(x => x.id !== undefined)
        let c = game.cart
        c.push(i)
        if(game) {
          game.cart = c
        }
      }
    },
    gameCartDeleted: {
      reducer(state, action) {
        const i = action.payload
        const game = state.find(x => x.id !== undefined)
        let c = game.cart
        const _c = c.filter(y => y === i)
        if(game) {
          game.cart = _c
        }
      }
    },
    gameScoreUpdated: {
      reducer(state, action) {
        const s = action.payload
        const game = state.find(x => x.id !== undefined)
        if(game) {
          game.score = s
        }
      }
    },
  },
})

export const selectAllGames = (state) => state.games

// TODO select only one game? and update it's cuisine, cart, grocery and score (maybe we don't need score since it will send back to backend?)

export const {gameAdded, 
              gameCuisineUpdated, 
              gameGroceryUpdated,
              gameCartAdded,
              gameCartUpdated,
              gameScoreUpdated} = GamesSlice.actions

export default GamesSlice.reducer