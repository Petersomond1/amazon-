import React from 'react'
import DashNavbar from './DashNavbar'
import DashSidebar from './DashSidebar'
import { Outlet } from 'react-router-dom'

const DashLayout = () => {
  return (
        <div className="flex h-screen w-full">
      <div className="sticky top-0">
        <DashSidebar />
      </div>
      <div className="flex-1 flex flex-col">
        <DashNavbar className="sticky top-0 z-10" />
        <div className="flex-grow m-1 p-2 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DashLayout