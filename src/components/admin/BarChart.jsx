import React, { useRef, useEffect } from 'react';
import { Chart } from 'chart.js';

const BarChart = ({ data, options }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Destroy any existing chart instance
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Create a new chart instance
    chartInstanceRef.current = new Chart(ctx, {
      type: 'bar',
      data,
      options,
    });

    // Cleanup on component unmount
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data, options]); // Re-run the effect if data or options change

  return <canvas ref={chartRef}></canvas>;
};

export default BarChart;
