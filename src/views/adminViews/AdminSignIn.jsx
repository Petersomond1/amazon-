import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Button, TextField, Typography, Card, CardContent } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../services/apiConfig";
import { useNavigate} from 'react-router-dom';


const AdminLogin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate()
  const mutation = useMutation(async (data) => {
    // Replace with your API call
    const response =  await api.post("http://localhost:3000/api/auth/admin-login", data)
    return response.data;
  });

  const onSubmit = (data) => {
    mutation.mutate(data, {
      onSuccess: (newData) => {
        toast.success("Login successful!");
        console.log("here is", newData)
        navigate(newData.redirect)
      },
      onError: () => {
        toast.error("Login failed. Please try again.");
      },
    });
  };

  return (
    <div className="flex h-screen w-full bg-gray-100">
      {/* Left Side - Design/Content */}
      <div className="w-1/2 bg-blue-600 flex flex-col justify-center items-center text-white">
        <div className="text-center p-8">
          <Typography variant="h3" className="font-bold">
            Welcome Back, Admin!
          </Typography>
          <Typography variant="body1" className="mt-4">
            Manage your dashboard and maintain control over your platform.
          </Typography>
          <div className="mt-8">
          <div className="mt-8">
            <img
                src="/images/admin.png"
                alt="Admin Dashboard Illustration"
                className="rounded-lg shadow-lg"
                style={{ width: "400px", height: "300px" }}
            />
            </div>

          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-1/2 flex justify-center items-center p-8">
        <Card className="w-full max-w-md shadow-xl">
          <CardContent>
            <Typography variant="h5" className="font-bold mb-4 text-center">
              Admin Login
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                {...register("email", { required: "Email is required" })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                fullWidth
                type="password"
                label="Password"
                variant="outlined"
                {...register("password", { required: "Password is required" })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                className="mt-4"
              >
                Login
              </Button>
            </form>
            <Typography variant="body2" className="text-center mt-4 text-gray-600">
              Forgot password? Contact support.
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;