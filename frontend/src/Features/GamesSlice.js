import { createSlice } from "@reduxjs/toolkit";
import { getCuisines, getIngredientTypes, getGameById, getScoreById, updateGameById } from '../Utils/Axios';

const initialState = []

let ingredientTypes = []
getIngredientTypes().then((res) => {
  ingredientTypes = res
})
let cuisines = []
getCuisines().then((res) => {
  cuisines = res
})

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
            score: 0,
            checkout: false,
          }
        }
      }
    },
    gameCheckoutUpdate:{
      reducer(state, action) {
        const ck = action.payload
        const game = state.find(x => x.id !== undefined)
        if (game) {
          game.checkout = ck
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
          game.grocery = g

          // NOTE modify grocery
          let _grocery = []
          game.grocery.map((key) => {
            const neededIngredient = ingredientTypes.find(x => x.id === key)
            _grocery.push(neededIngredient)
          })
          let __grocery = []
          _grocery.map((key) => {
            let item = {
              ...key,
              forCuisine: [],
              inCart: false
            }
            game.cuisine.map((x) => {
              let rqmt = cuisines.filter(y => y.id === x)[0].required_ingredient_types
              let pair = rqmt.find(z => z === key.id)
              if(pair !== undefined) {
                item.forCuisine.push(cuisines.find(l => l.id === x).name)
              }
            })
            __grocery.push(item)
          })

          game.grocery = __grocery
        }
      }
    },
    gameCartAdded: {
      reducer(state, action) {
        const item = action.payload
        const game = state.find(x => x.id !== undefined)
        if(game) {
          let c = game.cart
          let _item

          // NOTE check inCart for game.grocery, add forCuisine property, check checkout
          const idx = game.grocery.findIndex(y => y.id === parseInt(item.id.split('_')[0]))
          if (idx !== -1) {
            if (game.grocery[idx].inCart === false) {
              game.grocery[idx].inCart = true
            } else {
              let _c = c.filter(z => parseInt(z.id.split('_')[0]) !== parseInt(item.id.split('_')[0]))
              c = _c
            }
            _item = {
              ...item,
              forCuisine: game.grocery[idx].forCuisine
            }
          } else {
            _item = {
              ...item,
            }
          }

          // check checkout status
          if (game.grocery.find(z => z.inCart === false) === undefined) {
            game.checkout = true
          } else {
            game.checkout = false
          }

          c.push(_item)
          game.cart = c
        }
      }
    },
    gameCartDeleted: {
      reducer(state, action) {
        const id = action.payload
        const game = state.find(x => x.id !== undefined)
        let c = game.cart
        const _c = c.filter(y => y.id !== id)
        if(game) {
          game.cart = _c

          // NOTE check inCart for game.grocery, add forCuisine property, check checkout
          const idx = game.grocery.findIndex(y => y.id === parseInt(id.split('_')[0]))
          if (idx !== -1) {
            if (game.grocery[idx].inCart === true) {
              game.grocery[idx].inCart = false
            }
          }
          if (game.grocery.find(z => z.inCart === false) === undefined) {
            game.checkout = true
          } else {
            game.checkout = false
          }
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
              gameCartDeleted,
              gameScoreUpdated} = GamesSlice.actions

export default GamesSlice.reducer