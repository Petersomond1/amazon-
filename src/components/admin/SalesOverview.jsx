import React from 'react';

const SalesTable = () => {
  const salesData = [
    { date: '2025-01-01', category: 'Electronics', product: 'Smartphone', units: 50, revenue: '$15,000', margin: '25%' },
    { date: '2025-01-02', category: 'Fashion', product: 'T-Shirt', units: 100, revenue: '$2,000', margin: '50%' },
  ];

  return (
    <div className="mt-6 bg-white p-6 shadow-md rounded">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Date</th>
            <th className="border border-gray-300 p-2">Category</th>
            <th className="border border-gray-300 p-2">Product</th>
            <th className="border border-gray-300 p-2">Units Sold</th>
            <th className="border border-gray-300 p-2">Revenue</th>
            <th className="border border-gray-300 p-2">Profit Margin</th>
          </tr>
        </thead>
        <tbody>
          {salesData.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2">{item.date}</td>
              <td className="border border-gray-300 p-2">{item.category}</td>
              <td className="border border-gray-300 p-2">{item.product}</td>
              <td className="border border-gray-300 p-2">{item.units}</td>
              <td className="border border-gray-300 p-2">{item.revenue}</td>
              <td className="border border-gray-300 p-2">{item.margin}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesTable;
