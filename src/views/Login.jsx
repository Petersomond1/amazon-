import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../assets/assets/logo.png";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth(); // 🛑 Use login from context
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await login(data); // ✅ Login & Update State
      navigate("/"); // ✅ Redirect after successful login
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="mb-6">
        <img src={logo} alt="Amazon Logo" className="w-28" />
      </div>

      <div className="bg-white p-6 w-96 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Sign in</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-gray-700 font-medium">Email</label>
            <input type="text" className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-yellow-300"
              {...register("email", { required: "Email is required" })} />
            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
          </div>

          <div>
            <label className="text-gray-700 font-medium">Password</label>
            <input type="password" className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-yellow-300"
              {...register("password", { required: "Password is required" })} />
            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
          </div>

          <button type="submit" className="w-full bg-yellow-500 text-black py-2 rounded-lg font-semibold hover:bg-yellow-400 transition duration-300">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
