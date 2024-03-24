import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosService } from "../../Services/axios.service";

export default function ChangeRestedPassword() {
  const [password, setPassword] = useState(``);
  const [rePassword, setRePassword] = useState(``);
  const [accept, setAccept] = useState(false);

  const { id } = useParams();

  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setAccept(true);
    let res = await axiosService.post("api/auth/change-rested-password", {
      password: password,
      user_id: id,
      password_confirmation: rePassword,
    });

    if (res.status === 200) nav("/login");
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "calc(100vh - 40px)" }}
    >
      <form className="py-5 px-2 px-sm-5 text-center text-light">
        <h2 className="fs-1">Change password</h2>
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
        <button
          type="submit"
          className="bg-transparent border border-2 border-white rounded-pill text-light p-2 px-5 mt-3 fs-5 fw-bold"
          onClick={submit}
        >
          Change
        </button>
      </form>
    </div>
  );
}
