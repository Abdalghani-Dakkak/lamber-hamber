import { useState } from "react";
import { axiosService } from "../../Services/axios.service";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import { useDispatch, useSelector } from "react-redux";
import { addDetails } from "../../Slices/userSlice";

export default function VerifyAccount() {
  const [code, setCode] = useState(``);
  const [accept, setAccept] = useState(false);
  const [codeError, setCodeError] = useState(``);

  const { id } = useParams();

  const cookie = new Cookies();
  const nav = useNavigate();

  const userSlice = useSelector((state) => state.user);
  const phone = userSlice.phone;

  const dispatch = useDispatch();

  async function submit(e) {
    e.preventDefault();
    setAccept(true);
    let res = await axiosService.post("api/auth/verify-account", {
      user_id: id,
      verify_type: 1,
      code: code,
    });

    if (res.status === 200) {
      cookie.set("token", res.data.access_token);
      cookie.set("phone", phone);
      dispatch(
        addDetails({
          token: res.data.access_token,
          phone: phone,
        })
      );
      nav("/");
    } else setCodeError(res.error.message);
  }

  async function reSend() {
    let res = await axiosService.post("api/auth/resend", {
      phone: cookie.get("phone"),
      verify_type: 1,
    });
    if (res.status === 200) alert(res.data.message);
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "calc(100vh - 40px)" }}
    >
      <form className="py-5 px-2 px-sm-5 text-center text-light">
        <h2 className="fs-1">Verify your account</h2>
        <div className="d-flex flex-column p-3">
          <input
            type="number"
            className="px-2 py-1 my-2 bg-transparent border-0 border-bottom text-light fs-5 w-100"
            placeholder="Code Verify..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          {!code && accept ? (
            <span className="error-messages">The code field is required.</span>
          ) : (
            codeError &&
            accept && <span className="error-messages">{codeError}</span>
          )}
        </div>
        <div className="text-start p-3">
          <button
            type="button"
            className="bg-transparent border border-white p-1 rounded text-light fs-6"
            onClick={reSend}
          >
            Resend
          </button>
        </div>
        <button
          type="submit"
          className="bg-transparent border border-2 border-white rounded-pill text-light p-2 px-5 mt-3 fs-5 fw-bold"
          onClick={submit}
        >
          Verify
        </button>
      </form>
    </div>
  );
}
