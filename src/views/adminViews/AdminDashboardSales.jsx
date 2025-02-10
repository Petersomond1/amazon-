import { motion } from "framer-motion";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { useState } from "react";

ChartJS.register(...registerables);

export default function SalesDashboard() {
  const [filter, setFilter] = useState("7days");

  // Dummy data for charts
  const categorySalesData = {
    labels: ["Electronics", "Fashion", "Home & Kitchen", "Books", "Toys"],
    datasets: [
      {
        label: "Revenue",
        data: [5000, 3000, 2000, 1500, 1000],
        backgroundColor: ["#4CAF50", "#2196F3", "#FF9800", "#E91E63", "#9C27B0"],
      },
    ],
  };

  const productSalesData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Laptop",
        data: [100, 120, 130, 140],
        borderColor: "#FF5722",
        backgroundColor: "rgba(255, 87, 34, 0.2)",
        borderWidth: 2,
        fill: true,
      },
      {
        label: "Smartphone",
        data: [80, 90, 100, 110],
        borderColor: "#2196F3",
        backgroundColor: "rgba(33, 150, 243, 0.2)",
        borderWidth: 2,
        fill: true,
      },
      {
        label: "Tablet",
        data: [50, 60, 70, 75],
        borderColor: "#FFC107",
        backgroundColor: "rgba(255, 193, 7, 0.2)",
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const topProductsData = {
    labels: ["Laptop", "Smartphone", "Tablet", "Headphones", "Smartwatch"],
    datasets: [
      {
        label: "Units Sold",
        data: [150, 120, 90, 80, 70],
        backgroundColor: ["#FFC107", "#03A9F4", "#8BC34A", "#FF5722", "#E91E63"],
      },
    ],
  };

  const categoryDistributionData = {
    labels: ["Electronics", "Fashion", "Toys", "Books", "Home & Kitchen"],
    datasets: [
      {
        label: "Category Distribution",
        data: [40, 25, 15, 10, 10],
        backgroundColor: ["#4CAF50", "#2196F3", "#FF9800", "#E91E63", "#9C27B0"],
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="pb-4 border-b border-gray-200 mb-6"
      >
        <h1 className="text-3xl font-bold">Sales Analytics Dashboard</h1>
        <p className="text-gray-600">Monitor sales data, growth, and product performance.</p>
      </motion.header>

      {/* Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales by Category */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white shadow-md rounded-lg p-4"
        >
          <h3 className="text-xl font-bold mb-4">Sales by Category</h3>
          <Bar
            data={categorySalesData}
            options={{
              plugins: {
                legend: { display: true },
              },
            }}
          />
        </motion.div>

        {/* Product Sales Over Time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="bg-white shadow-md rounded-lg p-4"
        >
          <h3 className="text-xl font-bold mb-4">Product Sales Over Time</h3>
          <Line
            data={productSalesData}
            options={{
              plugins: {
                legend: { display: true },
              },
            }}
          />
        </motion.div>

        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="bg-white shadow-md rounded-lg p-4"
        >
          <h3 className="text-xl font-bold mb-4">Categories</h3>
          <div className="grid grid-cols-2 gap-4">
                        <Pie
              data={categoryDistributionData}
              options={{
                plugins: {
                  legend: { display: false },
                },
              }}
            />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="bg-white shadow-md rounded-lg p-4"
        >
          <h3 className="text-xl font-bold mb-4">Top Products</h3>
          <div className="grid grid-cols-2 gap-4">
            <Pie
              data={topProductsData}
              options={{
                plugins: {
                  legend: { display: false },
                },
              }}
            />
          </div>
        </motion.div>
        
      </section>
    </div>
  );
}
