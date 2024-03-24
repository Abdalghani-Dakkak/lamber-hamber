import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { axiosService } from "../../Services/axios.service";
import { appService } from "../../Services/app.service";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/Loader/Loader";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { addDetails } from "../../Slices/userSlice";

export default function Login() {
  const [name, setName] = useState(``);
  const [email, setEmail] = useState(``);
  const [countryId, setCountryId] = useState();
  const [password, setPassword] = useState(``);
  const [rePassword, setRePassword] = useState(``);
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [accept, setAccept] = useState(false);
  const [emailError, setEmailError] = useState(``);
  const [phoneError, setPhoneError] = useState(``);

  const nav = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    appService.getCountries(dispatch);
  }, [dispatch]);
  const countries = useSelector((state) => state.countries);

  let res;

  async function register(e) {
    e.preventDefault();
    setAccept(true);
    setEmailError(``);
    setPhoneError(``);
    res = await axiosService.post("api/auth/register", {
      name: name,
      email: email,
      country_id: countryId,
      password: password,
      phone: phone.slice(1, phone.length),
      address: address,
    });

    if (res.status === 200) {
      dispatch(
        addDetails({
          token: null,
          phone: phone.slice(1, phone.length),
        })
      );
      nav(`/verify-account/${res.data.user_id}`);
    }
    if (res.status === 422) {
      if (res.error.errors.email) setEmailError(res.error.errors.email);
      if (res.error.errors.phone) setPhoneError(res.error.errors.phone);
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center">
      <form className="py-5 px-2 px-sm-5 text-center text-light">
        <h2 className="fs-1">Register</h2>
        <div className="d-flex flex-column p-3">
          <input
            type="text"
            className="px-2 py-1 my-2 bg-transparent border-0 border-bottom text-light fs-5"
            placeholder="User name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {!name && accept ? (
            <span className="error-messages">The name field is required.</span>
          ) : (
            name.length <= 2 &&
            accept && (
              <span className="error-messages">
                Name must be more than 2 character
              </span>
            )
          )}
        </div>
        <div className="d-flex flex-column p-3">
          <input
            type="email"
            className="px-2 py-1 my-2 bg-transparent border-0 border-bottom text-light fs-5"
            placeholder="Email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {!email && accept ? (
            <span className="error-messages">The email field is required.</span>
          ) : (
            emailError &&
            accept && <span className="error-messages">{emailError}</span>
          )}
        </div>
        <div className="d-flex flex-column p-3">
          {countries.isLoading && !countries.errorCountries ? (
            <Loader />
          ) : countries.errorCountries ? (
            <div className="d-flex flex-column w-100 px-4">
              <h2 className="error-status">
                Error {countries.errorCountries.status}
              </h2>
              <button
                type="button"
                className="error-btn p-2 px-3 fs-5 rounded-pill"
                onClick={() => appService.getCountries(dispatch)}
              >
                Get Countries
              </button>
            </div>
          ) : (
            <select
              className="bg-transparent border-0 text-light w-100 fs-4"
              defaultValue={0}
              value={countryId}
              onChange={(e) => setCountryId(e.target.value)}
            >
              <option className="fs-6" value={0} disabled>
                Contries
              </option>
              {countries.countries &&
                countries.countries.data.data.map((country, index) => (
                  <option key={index} value={country.id} className="fs-6">
                    {country.name}
                  </option>
                ))}
            </select>
          )}
          {!countryId && accept && (
            <span className="error-messages">
              The country id field is required.
            </span>
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
        <div className="d-flex flex-column p-3">
          <input
            type="password"
            className="px-2 py-1 my-2 bg-transparent border-0 border-bottom text-light fs-5"
            placeholder="Repeat password..."
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
          />
          {rePassword !== password && accept && (
            <span className="error-messages">Password does not match</span>
          )}
        </div>
        <div className="d-flex flex-column p-3">
          <PhoneInput
            placeholder="Enter phone number"
            className="px-2 py-1 my-2 bg-transparent border-0 border-bottom text-light fs-5"
            value={phone}
            onChange={setPhone}
          />
          {!phone && accept ? (
            <span className="error-messages">The phone field is required.</span>
          ) : (
            phoneError &&
            accept && <span className="error-messages">{phoneError}</span>
          )}
        </div>
        <div className="d-flex flex-column p-3">
          <input
            type="number"
            className="px-2 py-1 my-2 bg-transparent border-0 border-bottom text-light fs-5"
            placeholder="Address number..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <span className="error"></span>
        </div>
        <div className="d-flex justify-content-between p-3">
          <Link to="/login" className="nav-link border-bottom fw-lighter">
            Login
          </Link>
        </div>
        <button
          type="submit"
          className="bg-transparent border border-2 border-white rounded-pill text-light p-2 px-5 mt-3 fs-5 fw-bold"
          onClick={register}
        >
          Register
        </button>
      </form>
    </div>
  );
}
