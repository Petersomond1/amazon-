import React from "react";
import "../style/layout.css";

const HeaderFilter = ({ sortOption, handleSortData }) => {
  console.log("ha ", sortOption);
  return (
    <div className="Filter-header">
      <p className="some-stuff">1-48 of 770 results for "drone"</p>
      <select
        name="Sort By"
        id=""
        className="select-filter"
        value={sortOption}
        onChange={handleSortData}
      >
        <option value="priceLowToHigh">Price : lower to hight</option>
        <option value="priceHighToLow">Price : hight to low</option>
        <option value="avgCustomerReview">AVG: customer review</option>
        <option value="newest">Newst </option>
        {/* <option value="top">Best Sellers </option> */}
      </select>
    </div>
  );
};

export default HeaderFilter;
