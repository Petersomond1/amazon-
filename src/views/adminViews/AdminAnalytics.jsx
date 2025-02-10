import { motion } from "framer-motion";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { useState } from "react";
import { useCategorySales, useProductSales, useTopProducts, useGetGrowth } from "../../services/adminAnalytics";
import ControlProducts from "./ControlProducts";

ChartJS.register(...registerables);

export default function AdminAnalytics() {
  const [filter, setFilter] = useState("7days");

  // Fetch data using React Query
  const { data: categorySalesData, isLoading: isCategoryLoading } = useCategorySales(filter);
  const { data: productSalesData, isLoading: isProductLoading } = useProductSales(filter);
  const { data: topProductsData, isLoading: isTopProductsLoading } = useTopProducts(filter);
  const { data: growthRateData, isLoading:isLoadingGrowth, } = useGetGrowth(filter);
  const renderChart = (loading, ChartComponent, data, title) => {
    if (loading) return <p>Loading...</p>;
    if (!data) return <p>No data available.</p>;


    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-md rounded-lg p-4"
      >
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <ChartComponent data={data} />
      </motion.div>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      
      <section className="mb-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center space-x-4"
        >
          <button
            onClick={() => setFilter("7days")}
            className={`px-4 py-2 rounded ${
              filter === "7days" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Last 7 Days
          </button>
          <button
            onClick={() => setFilter("30days")}
            className={`px-4 py-2 rounded ${
              filter === "30days" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Last 30 Days
          </button>
          <button
            onClick={() => setFilter("alltime")}
            className={`px-4 py-2 rounded ${
              filter === "alltime" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            All Time
          </button>
        </motion.div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="lg:row-span-2 " >
            <ControlProducts />
          </div>

   

        {renderChart(
          isTopProductsLoading,
          Pie,
          topProductsData && {
            labels: topProductsData?.map((item) => item.product),
            datasets: [
              {
                label: "Units Sold",
                data: topProductsData?.map((item) => item.units_sold),
                backgroundColor: ["#FFC107", "#03A9F4", "#8BC34A", "#FF5722", "#E91E63"],
              },
            ],
          },
          "Top Products"
        )}

     {/* Growth Rate by Category */}
        {renderChart(
          isLoadingGrowth,
          Line,
          growthRateData && {
            labels: growthRateData.map((item) => item.category),
            datasets: [
              {
                label: "Growth Rate (%)",
                data: growthRateData.map((item) => (item.growthRate !== null ? item.growthRate : 0)),
                borderColor: "#03A9F4",
                backgroundColor: "rgba(3, 169, 244, 0.2)",
                fill: true,
                tension: 0.3,
              },
            ],
          },
          "Growth Rate by Category"
        )}
      </section>
    </div>
  );
}
