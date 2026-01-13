import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allJobs: [],
  allAdminJobs: [],
  singleJob: null,
  loading: false,
  allAppliedJobs: [],
  searchedQuery: "",
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload || [];
    },
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload || [];
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAllAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload || [];
    },
    setSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload || "";
    },
  },
});

export const {
  setAllJobs,
  setAllAdminJobs,
  setSingleJob,
  setLoading,
  setAllAppliedJobs,
  setSearchedQuery,
} = jobSlice.actions;

export default jobSlice.reducer;
