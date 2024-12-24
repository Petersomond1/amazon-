// src/components/layout/Layout.js
import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./footer/Footer";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {

  const [sortOption, setSortOption] = useState("");

  const handleSortData = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div className="font-bodyFont">
      <Navbar />
      <div className="relative z-0">
        <Outlet   />
      </div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;