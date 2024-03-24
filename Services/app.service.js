import {
  gettingCountriesFiled,
  gettingCountriesStart,
  gettingCountriesSuccess,
} from "../Slices/contriesSlice";
import {
  gettingUserDetailsFiled,
  gettingUserDetailsStart,
  gettingUserDetailsSuccess,
} from "../Slices/userDetailsSlice";
import { addDetails } from "../Slices/userSlice";
import { axiosService } from "./axios.service";

async function getCountries(dispatch) {
  dispatch(gettingCountriesStart());
  const res = await axiosService.get("api/countries/getAll");
  if (res.status === 200) dispatch(gettingCountriesSuccess(res));
  else dispatch(gettingCountriesFiled(res));
}

async function getUserDetails(dispatch, token) {
  dispatch(gettingUserDetailsStart());
  const res = await axiosService.get("api/auth/me", token);
  if (res.status === 200) dispatch(gettingUserDetailsSuccess(res));
  else dispatch(gettingUserDetailsFiled(res));
}

async function refreshToken(dispatch, token) {
  const res = await axiosService.post("api/auth/refresh", null, token);
  console.log(res);
  if (res.status === 200) dispatch(addDetails(res.data.token));
}

export const appService = {
  getCountries,
  getUserDetails,
  refreshToken,
};
