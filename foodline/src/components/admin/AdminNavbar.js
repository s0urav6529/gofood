import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("adminAuthToken");
    navigate("/admin");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <NavLink className="navbar-brand fs-1 fst-italic" to="/">
            Foodline
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="/navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <ul className="navbar-nav me-auto mb-2">
              <li>
                <NavLink
                  className="nav-link active fs-5"
                  aria-current="page"
                  to="/admin"
                >
                  Home
                </NavLink>
              </li>
              {localStorage.getItem("adminAuthToken") ? (
                <div className="d-flex">
                  <li>
                    <NavLink
                      className="nav-link active fs-5"
                      aria-current="page"
                      to="/allorders"
                    >
                      All Orders
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="nav-link active fs-5"
                      aria-current="page"
                      to="/alluser"
                    >
                      All Users
                    </NavLink>
                  </li>
                </div>
              ) : (
                ""
              )}
            </ul>
            {!localStorage.getItem("adminAuthToken") ? (
              <div className="d-flex">
                <NavLink
                  className="btn bg-white text-success mx-1"
                  to="/adminlogin"
                >
                  Login
                </NavLink>
                <NavLink
                  className="btn bg-white text-success mx-1"
                  to="/adminsignup"
                >
                  Signup
                </NavLink>
              </div>
            ) : (
              <div>
                <NavLink
                  className="btn bg-white text-success mx-1"
                  to="/addfood"
                >
                  Add Food
                </NavLink>
                <div
                  className="btn bg-white text-danger mx-1"
                  onClick={handleLogout}
                >
                  LogOut
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
