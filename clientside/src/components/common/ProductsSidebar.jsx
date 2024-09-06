import React from "react";

const ProductsSidebar = () => {
  return (
    <div className="sticky top-[120px] z-50  flex-start">
      <div className="first-sidebar-fiter">
        <h3>First Filter</h3>

        <div className="checkbox-filter">
          <input type="checkbox" style={{ width: "18px", height: "18px" }} />
          <label htmlFor="first-checkbox">Amazon Basics</label>
        </div>
        <div className="checkbox-filter">
          <input type="checkbox" style={{ width: "18px", height: "18px" }} />
          <label htmlFor="second-checkbox">Provider</label>
        </div>
        <div className="third-filter">
          <input type="checkbox" style={{ width: "18px", height: "18px" }} />
          <label htmlFor="third-checkbox">Availabiltiy</label>
        </div>
        <div className="fourth-filter">
          <input type="checkbox" style={{ width: "18px", height: "18px" }} />
          <label htmlFor="fourth-checkbox">Shipping arround world</label>
        </div>
      </div>
      <div className="second-sidebar-fiter">
        <h3>Second Filter</h3>
        <input type="range" />
      </div>
      <div className="third-sidebar-fiter">third Filter</div>
      <div className="fouth-sidebar-fiter">fourth Filter</div>
    </div>
  );
};

export default ProductsSidebar;
