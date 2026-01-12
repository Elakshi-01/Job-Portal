import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  singleCompany: null,       // currently viewed/edited company
  companies: [],             // all companies for the user/admin
  searchCompanyByText: "",   // search filter
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setSingleCompany: (state, action) => {
      state.singleCompany = action.payload;
    },
    clearSingleCompany: (state) => {
      state.singleCompany = null;
    },
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },
    setSearchCompanyByText: (state, action) => {
      state.searchCompanyByText = action.payload;
    },
  },
});

export const {
  setSingleCompany,
  clearSingleCompany,
  setCompanies,
  setSearchCompanyByText,
} = companySlice.actions;

export default companySlice.reducer;
