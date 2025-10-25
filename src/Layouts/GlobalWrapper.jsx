import React from 'react'
import Navbar from './Navbar'
import { Outlet } from "react-router-dom";


const GlobalWrapper = () => {
  return (
    <>
    <Navbar/>
    <Outlet />
    </>
  )
}

export default GlobalWrapper