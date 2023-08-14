import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import { logoutUser } from "../../../Config/redux/reducers/authSlice";
import { useDispatch, useSelector } from "react-redux";
import userAxios from '../../../Assets/axiosForUser';

const NavBar = () => {
  const [nav, setNav] = useState(false);
  const [locations, setLocations] = useState([]);
  const authTokens = useSelector(s => s.user.authTokens);
  const parsed = JSON.parse(authTokens);
  const access = parsed?.access;
  const [search, setSearch] = useState([]);
  const [key, setKey] = useState("");
  const dispatch = useDispatch();

  const handleNav = () => {
    setNav(!nav);
  };


  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await userAxios.get('/locations'); // Replace with the correct API endpoint
        console.log(response.data)
        setLocations(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLocations();
  }, []);



  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleLocationSelect = (location) => {
    setSelectedLocation(location); // Update the selected location
    setNav(false); // Close the dropdown after selecting a location
  };



  return (
    <div className="bg-black">
      <section className="bg-black text-white flex w-full justify-between items-center h-20 px-4">
        <Link to="/">
          <h1 className="text-3xl font-thin text-[#f8f8f8]">
            ReelRush<sup className="text-red-700">ORG</sup>
          </h1>
        </Link>

        <div className="hidden md:flex">
          <div className="relative">
            <div className="flex items-center w-auto mt-2 bg-white rounded-md">
              <input
                type="search"
                className="bg-transparent text-black border-none focus:outline-none py-2 px-2"
                placeholder="Search for movies, events, Plays, Sports and Activities."
                value={key}
                onChange={(e) => setKey(e.target.value)}
              />
            </div>
            {/* ... Other code for search results */}
          </div>

          <ul className="flex space-x-4">
            <li className="px-4 py-2 truncate">About</li>
            <li className="px-4 py-2 relative">
              <Link to="/profile" >
                <button className="cursor-pointer focus:outline-none">
                  <span className="text-white">Profile</span>
                </button>
              </Link>
            </li>
            <li className="px-4 py-2 relative">
              <button
                className="cursor-pointer focus:outline-none"
                onClick={handleNav}
              >
                <span className="text-white">Location</span>
              </button>
              {nav && (
                <div className="absolute left-0 mt-2 bg-[#F80144]/10 w-full shadow-md">
                  <ul className="p-4 uppercase text-black bg-white">
                    {locations.map((location) => (
                      <li
                        key={location}
                        className="p-2 cursor-pointer hover:bg-[#F80144] rounded"
                        onClick={() => handleLocationSelect(location)}
                      >
                        {location}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          </ul>



          {access ? (
            <button
              className="px-6 py-3 text-white bg-red-600 rounded-md"
              type="button"
              onClick={() => {
                dispatch(logoutUser());
              }}
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button
                className="px-6 py-3 text-white bg-neutral-600 rounded-md"
                type="button"
              >
                Login
              </button>
            </Link>
          )}
        </div>

        <div onClick={handleNav} className="block md:hidden">
          {nav ? <FaTimes size={20} /> : <FaBars size={20} />}
        </div>

        <div
          className={
            nav
              ? "md:hidden fixed left-0 bg-[#F80144]/10 top-0 w-[60%] h-full shadow-2xl ease-in-out duration-300"
              : "ease-in-out duration-300 fixed left-[-100%]"
          }
        >
          <ul className="shadow-2xl pt-24 uppercase text-white">
            <li className="p-4 shadow-2xl hover:bg-[#F80144] cursor-pointer rounded-full truncate">
              About
            </li>
            <li className="p-4 shadow-2xl hover:bg-[#F80144] cursor-pointer rounded-full">
              Profile
            </li>
            <li className="p-4 shadow-2xl hover:bg-[#F80144] cursor-pointer rounded-full truncate">
              Sign In
            </li>
            <li className="p-4 shadow-2xl hover:bg-[#F80144] cursor-pointer rounded-full">
              Location
            </li>
          </ul>
        </div>
      </section>
      <hr className="border-[#000000]" />
      <div className="bg-black">
        {/* ... Other code */}
      </div>
    </div>
  );
};

export default NavBar;
