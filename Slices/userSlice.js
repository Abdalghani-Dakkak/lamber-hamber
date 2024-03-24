import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

const cookie = new Cookies();
let data = cookie.get("token")
  ? {
      token: cookie.get("token"),
      phone: cookie.get("phone"),
    }
  : {
      token: null,
      phone: null,
    };

const userSlice = createSlice({
  name: "user",
  initialState: data,
  reducers: {
    addDetails: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { addDetails } = userSlice.actions;
export default userSlice.reducer;
