import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { status: true }
]

const PlayingsSlice = createSlice({
  name: 'playings',
  initialState,
  reducers: {
    playingStatusToggled: {
      reducer (state, action) {
        const p = state.find(x => x.status !== undefined)
        if (p) {
          p.status = !p.status
        }
      }
    }
  }
})

export const selectAllPlayings = (state) => state.playings

export const {playingStatusToggled} = PlayingsSlice.actions

export default PlayingsSlice.reducer