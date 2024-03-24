import { configureStore } from "@reduxjs/toolkit";
import countriesSlice from "./Slices/contriesSlice";
import userSlice from "./Slices/userSlice";
import userDetailsSlice from "./Slices/userDetailsSlice";

const store = configureStore({
  reducer: {
    countries: countriesSlice,
    user: userSlice,
    userDetails: userDetailsSlice,
  },
});
export default store;
