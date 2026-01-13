import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  keyword: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilterKeyword: (state, action) => {
      state.keyword = action.payload;
    },
    clearFilter: (state) => {
      state.keyword = "";
    },
  },
});

export const { setFilterKeyword, clearFilter } = filterSlice.actions;
export default filterSlice.reducer;
