import React from "react";
import StandChart from "../../components/common/StandChart";
import Chart from "../../components/common/LineChart";
// import "../styles/dashboard.css";
import "./admindashboard.css"

const AdminDashboardSales = () => {
  return (
    <div className="charts">
      {/* <div className="chart">
        <StandChart />
      </div> */}
      <div className="chart">
        <Chart />
      </div>{" "}
      <div className="chart">
        <Chart />
      </div>
    </div>
  );
};

export default AdminDashboardSales;