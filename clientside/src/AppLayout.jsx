import React from 'react';
// import Navbardown from './navbar/Navbardown';
import { Outlet } from 'react-router-dom';


const AppLayout = () => {
  return (
    <>
      {/* <Navbardown /> */}
      <Outlet />
    </>
  );
};

export default AppLayout;