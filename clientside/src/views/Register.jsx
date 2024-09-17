import React, { useState } from "react";
import "./style/login.css"
import logo from "../assets/images/amazon-logo.png";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import api from "../services/apiConfig";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (data.password !== data.re_password) {
      alert("passwords are not identical");
    }
    try {
      const result = await api.post("/auth/register", data);
      if (result.status == 201) {
        navigate("/");
      }
    } catch (error) {
      console.log("here is the issue", error);
      setError(error);
    }
  };

  return (
    <div className="register-container">
      {error && <h3 style={{ color: "red" }}>{error.message}</h3>}
      <div className="register-upper">
        <img src={logo} alt="" style={{ width: "105px", height: "32px" }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="register-form">
          <h3 style={{ margin: "13px" }}>Create account</h3>

          <div className="register-input">
            <label htmlFor="name" className="register-labels">
              Your name
            </label>
            <input
              type="name"
              placeholder="name"
              name="name"
              className="register-input-field"
              {...register("name", { require: "the name is required" })}
            />
          </div>

          <div className="register-input">
            <label htmlFor="email" className="register-labels">
              Mobile number or email
            </label>
            <input
              type="email"
              placeholder="mobile or email"
              name="email"
              className="register-input-field"
              {...register("email", { require: "the email is required" })}
            />
          </div>

          <div className="register-input">
            <label htmlFor="password" className="register-labels">
              Password
            </label>
            <br></br>
            <input
              type="password"
              placeholder="password "
              name="password"
              className="register-input-field"
              {...register("password", { require: "the password is required" })}
            />
          </div>

          <div className="register-input">
            <label htmlFor="re-password" className="register-labels">
              Re-enter password
            </label>
            <br></br>
            <input
              type="password"
              placeholder="re-enter password"
              name="re-password"
              className="register-input-field"
              {...register("re_password", {
                require: "the re-password is required",
              })}
            />
          </div>
          <div className="register-input">
            <button className="register-btn" type="submit">
              Continue
            </button>
          </div>
          <div>
            <p style={{ fontSize: "14px", margin: "13px" }}>
              By creating an account, you agree to Amazon's Conditions of Use
              and Privacy Notice.
            </p>
            <br />
            <p style={{ fontSize: "13px", marginLeft: "13px" }}>
              <strong>Buying for work !</strong>
            </p>
            <Link style={{ fontSize: "13px", marginLeft: "13px" }}>
              Create a free business account
            </Link>
            <p style={{ fontSize: "12px", marginLeft: "13px" }}>
              Already have an account? <Link>Sign in</Link>
            </p>
          </div>
        </div>
      </form>
      <div className="register-footer">
        <div className="register-footer-links">
          <Link className="register-link">Conditions of use</Link>
          <Link className="register-link">Privacy Notice</Link>
          <Link className="register-link">Help</Link>
        </div>
        <div style={{ fontSize: "13px" }}>
          © 1996-2024, Amazon.com, Inc. or its affiliates{" "}
        </div>
      </div>
    </div>
  );
};

export default Register;
