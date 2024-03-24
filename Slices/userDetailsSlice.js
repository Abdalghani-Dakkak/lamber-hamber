import { createSlice } from "@reduxjs/toolkit";

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState: {
    userDetails: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    gettingUserDetailsStart: (state) => {
      state.userDetails = null;
      state.isLoading = true;
      state.error = null;
    },
    gettingUserDetailsSuccess: (state, action) => {
      state.userDetails = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    gettingUserDetailsFiled: (state, action) => {
      state.userDetails = null;
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  gettingUserDetailsStart,
  gettingUserDetailsSuccess,
  gettingUserDetailsFiled,
} = userDetailsSlice.actions;
export default userDetailsSlice.reducer;
