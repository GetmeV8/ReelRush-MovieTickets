import React from "react";
import { useState } from "react";
import {
    Card,
    List,
    ListItem,
    ListItemPrefix,
} from "@material-tailwind/react";
import {FaTicketAlt } from "react-icons/fa"
import { MdPayment } from "react-icons/md";
import { FiSettings } from 'react-icons/fi'
import { CgProfile } from 'react-icons/cg'


import { Link, useNavigate } from 'react-router-dom';



const NavItems = [
    {
        path: "/dashboard/my-profile",
        name: "My-Profile",
        icon: <CgProfile className='h-6 w-6' />
    },
    {
        path: "/",
        name: "My Bookings",
        icon: <FaTicketAlt className='h-6 w-6' />
    },
    {
        path: "/dashboard/settings",
        name: "Settings",
        icon: <FiSettings className='h-6 w-6' />

    },
];






const SideBar = () => {


    const [selected, setSelected] = useState("Dashboard");
    // const dispatch = useDispatch();
    const handleLogout = () => {
        // dispatch(clearToken());
        // location.reload();
    };

    return (
        <>
            <Card className='fixed top-0  h-full w-full max-w-[17rem] p-3 rounded-none text-white bg-black'>
                <div className=' mb-1 p-1 flex items-center gap-4  pl-3'>
                    <Link to='/'>
                        <h2>ReelRush</h2>
                        {/* <img className='h-9 ' alt='ReelRush' /> */}
                    </Link>
                </div>
                <List>
                    <hr className='my-2 border-blue-gray-50' />
                    {NavItems.map(({ icon, name, path }, index) => {
                        return (
                            <Link
                                key={index}
                                to={path}
                                onClick={() => {
                                    setSelected(name);
                                }}
                            >
                                <ListItem className="mt-2" selected={name === selected}>
                                    <ListItemPrefix>{icon}</ListItemPrefix>
                                    <span className=''>{name}</span>
                                </ListItem>
                            </Link>
                        );
                    })}
                </List>
            </Card>

        </>
    )
}
export default SideBar






