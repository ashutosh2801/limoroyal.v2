import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    startSearch: (state) => {
      state.loading = true;
    },
    saveSearch: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    destroySearch: (state) => {
      state.loading = false;
      state.data = null;
    },
  },
});

export const { startSearch, saveSearch, destroySearch } = searchSlice.actions;
export default searchSlice.reducer;
