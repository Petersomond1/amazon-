import React from 'react';
import { Doughnut, Line, Bubble } from 'react-chartjs-2';
import BarChart from './BarChart';

const SalesCharts = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Revenue',
        data: [1000, 1500, 2000, 1800, 2200],
        backgroundColor: '#4caf50',
        borderColor: '#4caf50',
        borderWidth: 1,
      },
      {
        label: 'Units Sold',
        data: [80, 120, 150, 130, 170],
        type: 'line',
        borderColor: '#2196f3',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
    },
  };

  return (
    <div className="grid grid-cols-2 gap-6 mt-6">
      <div className="bg-white p-4 shadow-md rounded">
        <BarChart data={data} options={options} />
      </div>
      <div className="bg-white p-4 shadow-md rounded">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default SalesCharts;
