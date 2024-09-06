// src/components/layout/Layout.js
import React, { useState } from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

import HeaderFilter from "../../components/common/HeaderFilter";

const ProductLayout = () => {
  const [sortOption, setSortOption] = useState("");

  const handleSortData = (e) => {
    setSortOption(e.target.value);
  };
  return (
    <div className="">
      <div className=" relative top-0 z-50">
        <Navbar />
        <HeaderFilter sortOption={sortOption} handleSortData={handleSortData} />
      </div>

      <div className="">
        <div className="product-layout-content relative z-0">
          <Outlet context={{ sortOption }} />
        </div>
      </div>
    </div>
  );
};

export default ProductLayout;
