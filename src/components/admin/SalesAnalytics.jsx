import React from 'react';
import SalesCharts from './SalesChart';
import SalesOverview from './SalesOverview';
import SalesTable from './SalesTable';


const SalesAnalytics = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Sales Analytics</h1>
        <SalesCharts />
        <SalesOverview />
        <SalesTable />
    </div>
  );
};

export default SalesAnalytics;
