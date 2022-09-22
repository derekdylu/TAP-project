import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { pageIndex: 0 }
]

const PagesSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    pageChanged: {
      reducer (state, action) {
        const v = action.payload
        const p = state.find(x => x.pageIndex >= 0)
        if(p) {
          p.pageIndex = p.pageIndex + v
        }
        if(p.pageIndex === -1)  p.pageIndex = 0
      },
    },
  },
})

export const selectAllPages = (state) => state.pages

export const {pageChanged} = PagesSlice.actions

export default PagesSlice.reducer