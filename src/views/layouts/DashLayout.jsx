import React from 'react';
import DashNavbar from './DashNavbar';
import DashSidebar from './DashSidebar';
import { Outlet } from 'react-router-dom';

const DashLayout = () => {
  return (
    <div className="flex h-screen w-full bg-gray-100">
      {/* Sidebar */}
      <div className="sticky top-0 h-screen">
        <DashSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        {/* <DashNavbar className="sticky top-0 z-10" /> */}

        {/* Outlet (Page Content) */}
        <div className="flex-grow p-6 overflow-y-auto bg-gray-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashLayout;