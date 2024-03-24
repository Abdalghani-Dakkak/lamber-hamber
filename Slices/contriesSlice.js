import { createSlice } from "@reduxjs/toolkit";

const countriesSlice = createSlice({
  name: "countries",
  initialState: {
    countries: null,
    isLoading: false,
    errorCountries: null,
  },
  reducers: {
    gettingCountriesStart: (state) => {
      state.countries = null;
      state.isLoading = true;
      state.errorCountries = null;
    },
    gettingCountriesSuccess: (state, action) => {
      state.countries = action.payload;
      state.isLoading = false;
      state.errorCountries = null;
    },
    gettingCountriesFiled: (state, action) => {
      state.countries = null;
      state.isLoading = false;
      state.errorCountries = action.payload;
    },
  },
});

export const {
  gettingCountriesStart,
  gettingCountriesSuccess,
  gettingCountriesFiled,
} = countriesSlice.actions;
export default countriesSlice.reducer;
