import { useEffect, useState } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
//components
import Sidebar from "../../../Components/TheatreAdmin/Sidebar/sidebar";


const DashBoard = () => {
    const Cinematoken = localStorage.getItem("Cinematoken")
    const [CinemaloggedIn, setCinemaLoggedIn] = useState(Cinematoken);
    const navigate = useNavigate()

    useEffect(() => {
        setCinemaLoggedIn(Cinematoken)
    }, [CinemaloggedIn])

    return (
        <div className=''>
            <Sidebar></Sidebar>
            <div className=" md:ml-64 bg-[#d3d1ce] ">
                {CinemaloggedIn ? <Outlet /> : <Navigate to={'/Cinemas'} />}
            </div>
        </div>
    )
}
export default DashBoard