import React, { useState, useEffect } from 'react'
import Theatreaxios from '../../../Assets/axiosForCinema'
import { Link, useNavigate } from 'react-router-dom'


const Approval = () => {
  const [status, setStatus] = useState('')
  const navigate = useNavigate()
  const checkAccept = () => {
    const token = localStorage.getItem('Cinematoken')
    // console.log(token)
    Theatreaxios.get('/theatre/checkAutherized', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((resp) => {
      if (resp.data.resp.accepted) {
        navigate('/CinemasPannel')
      } else {
        setStatus('Admin Not Approved! Try again later')
        setTimeout(() => {
          setStatus('')
        }, 3000)
      }
    })
  }


  return (
    <main className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
      <h1 className="text-6xl font-bold text-white">Access Deined</h1>
      <h1 className='text-white font-bold text-xl mt-4'>Waiting for Approval</h1>
      <span className="mt-5">
        <span
          className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring"
        >
          <span
            className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"
          ></span>

          <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
            <button onClick={() => {
              checkAccept()
            }}>Refresh</button>

          </span>

        </span>
        <p className='text-center text-red-700'>{status}</p>
      </span>
    </main>
  )
}

export default Approval
