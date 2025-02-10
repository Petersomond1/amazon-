import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import api from "../services/apiConfig";
import logo from "../assets/images/amazon-logo.png";
import "./style/signup.css"; // Custom CSS file for styling

const Register = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (data.password !== data.re_password) {
      return setError("⚠ Passwords do not match.");
    }
    try {
      setLoading(true);
      const result = await api.post("/auth/register", data);
      if (result.status === 201) {
        navigate("/");
      }
    } catch (error) {
      setError(error.response?.data?.message || "⚠ Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      {/* Amazon Logo */}
      <div className="register-logo">
        <Link to="/">
          <img src={logo} alt="Amazon Logo" />
        </Link>
      </div>

      {/* Registration Form */}
      <div className="register-form-container">
        <h2 className="register-title">Create account</h2>

        {error && <p className="register-error">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="register-form" style={{padding:"5px",maxWidth:"95%"}}>
          {/* Name Input */}
          <div className="register-input-group" >
            <label>Your Name</label>
            <input
              type="text"
              placeholder="First and last name"
              {...register("name", { required: "⚠ Name is required" })}
              style={{width:"100%"}}
            />
            {errors.name && <span className="register-error">{errors.name.message}</span>}
          </div>

          {/* Email Input */}
          <div className="register-input-group">
            <label>Mobile number or email</label>
            <input
              type="email"
              placeholder="Enter email or phone number"
              {...register("email", { required: "⚠ Email is required" })}
            />
            {errors.email && <span className="register-error">{errors.email.message}</span>}
          </div>

          {/* Password Input */}
          <div className="register-input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="At least 6 characters"
              {...register("password", { required: "⚠ Password is required", minLength: { value: 6, message: "⚠ Password must be at least 6 characters" } })}
            />
            {errors.password && <span className="register-error">{errors.password.message}</span>}
          </div>

          {/* Confirm Password Input */}
          <div className="register-input-group">
            <label>Re-enter Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              {...register("re_password", { required: "⚠ Please confirm your password" })}
            />
            {errors.re_password && <span className="register-error">{errors.re_password.message}</span>}
          </div>

          {/* Submit Button */}
          <button type="submit" className="register-button" disabled={loading}>
            {loading ? "Creating Account..." : "Continue"}
          </button>
        </form>

        <p className="register-terms">
          By creating an account, you agree to Amazon's <Link to="/">Conditions of Use</Link> and <Link to="/">Privacy Notice</Link>.
        </p>

        <hr className="register-divider" />

        <p className="register-subtext">
          <strong>Buying for work?</strong> <Link to="/">Create a free business account</Link>
        </p>

        <p className="register-login-link">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>

      {/* Footer */}
      <div className="register-footer">
        <div className="register-footer-links">
          <Link to="/">Conditions of Use</Link>
          <Link to="/">Privacy Notice</Link>
          <Link to="/">Help</Link>
        </div>
        <p>© 1996-2024, Amazon.com, Inc. or its affiliates</p>
      </div>
    </div>
  );
};

export default Register;
