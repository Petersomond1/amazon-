import React from 'react';

const SalesTable = () => {
  const salesData = [
    { date: '2025-01-01', category: 'Electronics', product: 'Laptop', units: 50, revenue: '$50,000' },
    { date: '2025-01-02', category: 'Fashion', product: 'T-Shirt', units: 100, revenue: '$2,000' },
  ];

  return (
    <div className="bg-white p-4 rounded shadow mt-4">
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Product</th>
            <th>Units Sold</th>
            <th>Revenue</th>
          </tr>
        </thead>
        <tbody>
          {salesData.map((item, index) => (
            <tr key={index}>
              <td>{item.date}</td>
              <td>{item.category}</td>
              <td>{item.product}</td>
              <td>{item.units}</td>
              <td>{item.revenue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesTable;
