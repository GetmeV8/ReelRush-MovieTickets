import React, { useState, useEffect, createContext } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import { logoutUser } from "../../../Config/redux/reducers/authSlice";
import { useDispatch, useSelector } from "react-redux";

const NavBar = () => {
  // const [movies, setMovies] = useState([]);
  // const [filteredMovies, setFilteredMovies] = useState([]);
  const [nav, setNav] = useState(false);
  // const usertoken = localStorage.getItem("token");
  const authTokens = (useSelector(s => s.user.authTokens))
  const parsed = JSON.parse(authTokens)
  console.log(parsed)
  const access = parsed?.access
  console.log(access)
  const [userLoggedIn, setUserLoggedIn] = useState(access);
  const dispatch = useDispatch()
  const [search, setSearch] = useState([]);
  const [key, setKey] = useState("");

  const handleNav = () => {
    setNav(!nav);
  };

  // useEffect(() => {
  //   setUserLoggedIn(usertoken);
  // }, [userLoggedIn]);





  
  return (
    <div className="bg-[#000000]">
      <section className="bg-black text-white flex w-full justify-between items-center h-20 px-4 ">
        <Link to={"/"}>
          {" "}
          <h1 className="w-full text-3xl font-thin text-[#f8f8f8]">
            ReelRush<sup className="text-red-700">ORG</sup>
          </h1>
        </Link>

        <div className="hidden md:flex">
          <div className="relative">
            <div className="flex items-center w-auto mt-2 bg-white rounded-md">
              <input
                type="search"
                className="bg-transparent  text-black  border-none focus:outline-none py-2 px-2"
                placeholder="Search for movies, events, Plays, Sports and Activities."
                value={key}
                onChange={(e) => setKey(e.target.value)}
              />
            </div>
            {search && search.length > 0 && (
              <div className="absolute top-full left-0 right-0 z-10 bg-white shadow-md max-h-60 overflow-y-auto">
                {search.map((movie) => (
                  <Link to={`/movie/${movie._id}`} key={movie._id}>
                    <div className="flex items-center px-2 py-3 cursor-pointer hover:bg-gray-100">
                      <div className="w-12 h-16 mr-4">
                        <img className="object-cover" src={movie.poster1} alt="" />
                      </div>

                      <div className="text-lg font-medium text-black">
                        {movie.moviename}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <ul className="flex">
            <li className="p-4">Movies</li>
            <li className="p-4 truncate">Coming Soon</li>
            <li className="p-4">About</li>
          </ul>

          {access ? (
            <button
              className="px-6 py-3 text-white bg-red-600 rounded-md"
              type="button"
              onClick={() => {
                dispatch(logoutUser())
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
          {!nav ? <FaBars size={20} /> : <FaTimes size={20} />}
        </div>

        <div
          className={
            nav
              ? " md:hidden fixed left-0 bg-[#F80144]/10 top-0 w-[60%] h-full shadow-2xl ease-in-out duration-300 "
              : "ease-in-out duration-300 fixed left-[-100%] "
          }
        >
          <ul className="shadow-2xl pt-24 uppercase text-white">
            <li className="p-4 shadow-2xl hover:bg-[#F80144] cursor-pointer rounded-full">
              Movies
            </li>
            <li className="p-4 shadow-2xl hover:bg-[#F80144] cursor-pointer rounded-full truncate">
              Coming Soon
            </li>
            <li className="p-4 shadow-2xl hover:bg-[#F80144] cursor-pointer rounded-full">
              About
            </li>
            <li className="p-4 shadow-2xl hover:bg-[#F80144] cursor-pointer rounded-full truncate">
              Sign In
            </li>
          </ul>
        </div>
      </section>
      <hr className="" />
      <div className="bg-black">
        {/* <FilterContext.Provider value={{ filteredMovies }}>
          <Outlet />
        </FilterContext.Provider> */}
      </div>
    </div>
  );
};

export default NavBar;
