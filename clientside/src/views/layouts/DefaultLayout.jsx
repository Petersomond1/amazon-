// src/components/layout/Layout.js
import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./footer/Footer";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const DefaultLayout = () => {
  const { user, loading, error, checkAuth } = useAuth();
  const [sortOption, setSortOption] = useState("");

  const handleSortData = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div className="font-bodyFont">
      <Navbar user={user} loading={loading} checkAuth={checkAuth} error={error} />
      <div className="relative z-0">
        <Outlet   />
      </div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;