import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allJobs: [],
  allAdminJobs: [],
  singleJob: null,
  loading: false,
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },

    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },

    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setAllJobs,
  setAllAdminJobs,
  setSingleJob,
  setLoading,
} = jobSlice.actions;

export default jobSlice.reducer;
