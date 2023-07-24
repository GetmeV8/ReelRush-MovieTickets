import React, { useEffect, useState } from 'react'
import Sidebar from '../../../Components/Admin/Sidebar/sideBar'
import Navbar from '../../../Components/Admin/Navbar/navbar'


//components

import { Outlet, useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()
  const [state, setState] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('Admintoken')
    setState(token)
  }, [state])

  return (
    <>
      {/* <Navbar></Navbar> */}
      <Sidebar></Sidebar>
      <div className="relative md:ml-64  min-h-screen h-auto bg-[#d4cece] pt-12 ">
        {/* <Outlet /> */}
        {state ? <Outlet /> : navigate('/admin')}
      </div>
    </>
  )
}

export default Dashboard
