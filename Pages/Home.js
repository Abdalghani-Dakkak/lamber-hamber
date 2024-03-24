import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "./Layouts/DefaultLayout";
import { useEffect } from "react";
import { appService } from "../Services/app.service";

export default function Home() {
  const userSlice = useSelector((state) => state.user);
  const userDetailsSlice = useSelector((state) => state.userDetails);

  const dispatch = useDispatch();

  useEffect(() => {
    appService.refreshToken(dispatch, userSlice.token);
    appService.getUserDetails(dispatch, userSlice.token);
  }, [dispatch, userSlice.token]);

  console.log(userSlice);
  console.log(userDetailsSlice);

  // document.body.style.background = "#fff";

  return (
    <div>
      <DefaultLayout>
        <h1>Home</h1>
      </DefaultLayout>
    </div>
  );
}
