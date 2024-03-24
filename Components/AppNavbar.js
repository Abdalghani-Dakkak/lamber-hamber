import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { axiosService } from "../Services/axios.service";
import Cookies from "universal-cookie";
import { useSelector } from "react-redux";

export default function AppNavbar() {
  const [, setResize] = useState(0);
  window.onresize = () => {
    setResize((prev) => prev + 1);
  };

  const user = useSelector((state) => state.user);

  const cookie = new Cookies();
  const nav = useNavigate();

  async function handleLogout() {
    const res = await axiosService.post("api/auth/logout", null, user.token);
    console.log(res);
    if (res.status === 200) {
      cookie.remove("token");
      cookie.remove("phone");
      nav("/login");
      alert(res.data.message);
    }
  }

  return (
    <>
      <Navbar sticky="top" expand="lg" className="d-flex flex-column">
        <Container>
          <Link to="/" className="navbar-brand fs-1 m-0 p-0 fw-bold">
            Lamber Hamber
          </Link>
          {document.body.clientWidth < 992 && (
            <div>
              <button className="menu-btn bg-transparent border border-3 rounded-circle fs-5 me-2 me-sm-3">
                <i className="bi bi-search"></i>
              </button>
              <div className="dropdown-center d-inline-block">
                <button
                  className="menu-btn bg-transparent border border-3 rounded-circle fs-5"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-three-dots-vertical"></i>
                </button>
                <ul
                  className="dropdown-menu sections text-center"
                  style={{ transform: "translateX(calc(-100% + 40px))" }}
                >
                  <li>
                    {" "}
                    <button
                      className="section bg-transparent border-0 fw-bold p-2 w-100"
                      onClick={handleLogout}
                    >
                      <i className="bi bi-box-arrow-left"></i> Logout
                    </button>
                  </li>
                  <li>
                    {" "}
                    <Link
                      to="/my-profile"
                      className="section nav-link fw-bold p-2 w-100"
                    >
                      <i className="bi bi-person-circle"></i> MyProfile
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          )}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <button
                className="bg-transparent border-0 fw-bold text-dark p-2 mx-2"
                onClick={handleLogout}
              >
                <i className="bi bi-box-arrow-left"></i> Logout
              </button>
              <Link
                to="/my-profile"
                className="nav-link fw-bold text-dark mx-2"
              >
                <i className="bi bi-person-circle"></i> MyProfile
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
        <div className="sections d-flex justify-content-between rounded-pill mt-3">
          <NavLink
            to="/"
            className="nav-link rounded-pill text-center px-2 px-md-5 py-2 section"
          >
            <i className="bi bi-chat-fill"></i> All Chats
          </NavLink>
          <NavLink
            to="/groups"
            className="nav-link rounded-pill text-center px-2 px-md-5 py-2 mx-2 section"
          >
            <i className="bi bi-people-fill"></i> Groups
          </NavLink>
          <NavLink
            to="/contacts"
            className="nav-link rounded-pill text-center px-2 px-md-5 py-2 section"
          >
            <i className="bi bi-telephone-fill"></i> Contacts
          </NavLink>
        </div>
      </Navbar>
    </>
  );
}
