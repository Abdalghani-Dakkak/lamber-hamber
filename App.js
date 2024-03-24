import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Home from "./Pages/Home";
import VerifyAccount from "./Pages/Auth/VerifyAccount";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import VerifyRestPassword from "./Pages/Auth/VerifyRestPassword";
import ChangeRestedPassword from "./Pages/Auth/ChangeRestedPassword";
import RequireAuth from "./Pages/Auth/RequireAuth";

function App() {
  return (
    <div>
      <Routes>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/rest-password" element={<ForgotPassword />} />
        <Route
          path="/verify-rest-password/:id"
          element={<VerifyRestPassword />}
        />
        <Route
          path="/change-rested-password/:id"
          element={<ChangeRestedPassword />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-account/:id" element={<VerifyAccount />} />
      </Routes>
    </div>
  );
}

export default App;
