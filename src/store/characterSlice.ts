import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface CharacterState {
  page: number
  filter: {
    name?: string
    status?: string
    species?: string
    type?: string
    gender?: string
  }
}

const initialState: CharacterState = {
  page: 1,
  filter: {},
}

export const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    setFilter: (state, action: PayloadAction<CharacterState["filter"]>) => {
      state.filter = action.payload
      state.page = 1
    },
  },
})

export const { setPage, setFilter } = characterSlice.actions

export default characterSlice.reducer
