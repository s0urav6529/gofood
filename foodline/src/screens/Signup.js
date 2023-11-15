import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import signup_logo from "../pictures/signup_logo.png";

export default function Signup() {
  let navigate = useNavigate();

  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/createuser/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation,
      }),
    });

    const json = await response.json();

    if (!json.success) {
      alert("Enter Valid Credentials");
    }
    if (json.success) {
      navigate("/login");
    }
  };

  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div className="container">
        <div className="container row mt-5">
          
          <div className="container col-md-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label htmlFor="exampleInputName" className="form-label">
                  User Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={credentials.name}
                  onChange={onChange}
                />
              </div>

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

              <div className="mb-5">
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

              <div className="mb-3">
                <label htmlFor="exampleInputLocation" className="form-label">
                  Location
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="geolocation"
                  value={credentials.geolocation}
                  onChange={onChange}
                />
              </div>

              <button type="submit" className="m-3 btn btn-success">
                SignUp
              </button>

              <Link to="/login" className="m-3 btn btn-danger">
                Already a User
              </Link>
            </form>
          </div>

          <div className="container col-md-6">
            <img src={signup_logo} alt="" className="d-block mx-auto" height={400} width={500} />
          </div>
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
