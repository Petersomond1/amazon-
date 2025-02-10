import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUser, FaLock, FaHome, FaSave, FaCog } from "react-icons/fa";

const Settings = () => {
  const { register, handleSubmit } = useForm();
  const [message, setMessage] = useState(null);

  const onSubmit = (data) => {
    setMessage("Your settings have been updated successfully!");
    console.log("Updated Data:", data);
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
        <FaCog className="mr-2" /> Account Settings
      </h1>

      {/* Success Message */}
      {message && (
        <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-lg space-y-6">
        {/* Profile Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaUser className="mr-2 text-blue-500" /> Profile Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-700 font-medium">Full Name</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                {...register("name")}
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="text-gray-700 font-medium">Email</label>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                {...register("email")}
                placeholder="your@email.com"
              />
            </div>
          </div>
        </div>

        {/* Password Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaLock className="mr-2 text-yellow-500" /> Change Password
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-700 font-medium">New Password</label>
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-yellow-200"
                {...register("new_password")}
                placeholder="New Password"
              />
            </div>
            <div>
              <label className="text-gray-700 font-medium">Confirm Password</label>
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-yellow-200"
                {...register("confirm_password")}
                placeholder="Confirm Password"
              />
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaHome className="mr-2 text-green-500" /> Address Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-700 font-medium">Shipping Address</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-green-200"
                {...register("shipping_address")}
                placeholder="123 Main St, City, Country"
              />
            </div>
            <div>
              <label className="text-gray-700 font-medium">Billing Address</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-green-200"
                {...register("billing_address")}
                placeholder="456 Another St, City, Country"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition flex items-center justify-center">
          <FaSave className="mr-2" /> Save Changes
        </button>
      </form>
    </div>
  );
};

export default Settings;
