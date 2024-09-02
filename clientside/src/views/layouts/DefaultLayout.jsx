import React from 'react'
import { Outlet } from 'react-router-dom'

function DefaultLayout() {
  return (
    <>
    <div>DefaultLayout</div>
    <Outlet/>
    </>
  )
}

export default DefaultLayout