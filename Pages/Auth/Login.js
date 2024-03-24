import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { axiosService } from "../../Services/axios.service";
import PhoneInput from "react-phone-number-input";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { addDetails } from "../../Slices/userSlice";

export default function Login() {
  const [phone, setPhone] = useState(``);
  const [password, setPassword] = useState(``);
  const [accept, setAccept] = useState(false);

  const nav = useNavigate();
  const cookie = new Cookies();

  const dispatch = useDispatch();

  async function submit(e) {
    e.preventDefault();
    setAccept(true);
    let res = await axiosService.post("api/auth/login", {
      phone: phone.slice(1, phone.length),
      password: password,
    });
    console.log(res);

    if (res.status === 200) {
      cookie.set("token", res.data.access_token);
      cookie.set("phone", phone.slice(1, phone.length));
      dispatch(
        addDetails({
          token: res.data.access_token,
          phone: phone.slice(1, phone.length),
        })
      );
      alert("تم تسجيل الدخول بنجاح");
      nav("/");
    } else alert(res.error.message);
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "calc(100vh - 40px)" }}
    >
      <form className="py-5 px-2 px-sm-5 text-center text-light">
        <h2 className="fs-1">Login</h2>
        <div className="d-flex flex-column p-3">
          <PhoneInput
            placeholder="Enter phone number"
            className="px-2 py-1 my-2 bg-transparent border-0 border-bottom text-light fs-5"
            value={phone}
            onChange={setPhone}
          />
          {!phone && accept && (
            <span className="error-messages">The phone field is required.</span>
          )}
        </div>
        <div className="d-flex flex-column p-3">
          <input
            type="password"
            className="px-2 py-1 my-2 bg-transparent border-0 border-bottom text-light fs-5"
            placeholder="Password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {!password && accept ? (
            <span className="error-messages">
              The password field is required.
            </span>
          ) : (
            password.length < 8 &&
            accept && (
              <span className="error-messages">
                Password must be more than 8 character
              </span>
            )
          )}
        </div>
        <div className="d-flex justify-content-between p-3">
          <Link to="/register" className="nav-link border-bottom fw-lighter">
            Register
          </Link>
          <Link
            to="/rest-password"
            className="nav-link border-bottom fw-lighter"
          >
            Forgot Password
          </Link>
        </div>
        <button
          type="submit"
          className="bg-transparent border border-2 border-white rounded-pill text-light p-2 px-5 mt-3 fs-5 fw-bold"
          onClick={submit}
        >
          Login
        </button>
      </form>
    </div>
  );
}
