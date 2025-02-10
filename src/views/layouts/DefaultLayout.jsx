import React from "react";
import Navbar from "./Navbar";
import Footer from "./footer/Footer";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <div className="flex flex-col min-h-screen font-bodyFont">
      <Navbar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
