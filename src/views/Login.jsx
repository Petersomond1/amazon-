// src/pages/SignIn.js
import React, { useState } from "react";
import "./style/login.css";
import { useForm } from "react-hook-form";
import { useLoginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { mutateAsync } = useLoginUser();

  const onSubmit = (data) => {
    mutateAsync(data);
  };

  return (
    <div className="signin-container">
      <form
        className="signin-form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <img
          src="/path/to/amazon-logo.png"
          alt="Amazon Logo"
          className="signin-logo"
        />
        <h1>Sign in</h1>
        <label htmlFor="email">Email or mobile phone number</label>
        <input type="text" id="email" {...register("email")} />

        <label htmlFor="password">Password </label>
        <input type="password" id="password" {...register("password")} />
        <button type="submit">Continue</button>
        <p>
          By continuing, you agree to Amazon's{" "}
          <a href="/conditions">Conditions of Use</a> and{" "}
          <a href="/privacy">Privacy Notice</a>.
        </p>
        <a href="/need-help">Need help?</a>
      </form>
      <div className="signin-footer">
        <p>New to Amazon?</p>
        <button onClick={() => navigate('/register')}>
          Create your Amazon account
        </button>
      </div>
    </div>
  );
};

export default Login;
