import React, { useState } from "react";
import AdminNavbar from "../../components/admin/AdminNavbar";
import Footer from "../../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import adminsignin_logo from "../../pictures/admin_login.png";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [credentials, setcredentials] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();

    if (!json.success) {
      alert("Invalid Email or Password");
    }
    if (json.success) {
      localStorage.setItem("adminEmail", credentials.email);
      localStorage.setItem("adminAuthToken", json.authToken);
      navigate("/admin");
    }
  };

  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div>
        <AdminNavbar />
      </div>

      <div className="container">
        <div className="container row mt-5">
          <div className="container col-md-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label htmlFor="exampleInputEmail" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={credentials.email}
                  onChange={onChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="exampleInputPassword" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={credentials.password}
                  onChange={onChange}
                />
              </div>

              <button type="submit" className="m-3 btn btn-success">
                Login
              </button>

              <Link to="/adminsignup" className="m-3 btn btn-danger">
                Create an account
              </Link>
            </form>
          </div>

          <div className="container col-md-6">
            <img
              src={adminsignin_logo}
              alt=""
              className="d-block mx-auto"
              height={400}
              width={500}
            />
          </div>
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
