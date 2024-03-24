import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import { axiosService } from "../../Services/axios.service";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [phone, setPhone] = useState(``);
  const [accept, setAccept] = useState(false);
  const [phoneError, setPhoneError] = useState(``);

  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setAccept(true);
    let res = await axiosService.post("api/auth/rest-password", {
      phone: phone.slice(1, phone.length),
    });

    if (res.status === 200) nav(`/verify-rest-password/${res.data.user_id}`);
    else setPhoneError(res.error.message);
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "calc(100vh - 40px)" }}
    >
      <form className="py-5 px-2 px-sm-5 text-center text-light">
        <h2 className="fs-1">Reset password</h2>
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
        <button
          type="submit"
          className="bg-transparent border border-2 border-white rounded-pill text-light p-2 px-5 mt-3 fs-5 fw-bold"
          onClick={submit}
        >
          Reset
        </button>
      </form>
    </div>
  );
}
