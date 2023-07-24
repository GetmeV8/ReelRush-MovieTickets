import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const [collapseShow, setCollapseShow] = useState('hidden');

  return (
    <>
      <nav className="bg-[#251e1e] text-white md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer hover:bg-[#ffffff] text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow('bg-white m-2 py-3 px-6')}
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* Brand */}
          <Link
            className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
            to="/adminpanel"
          >
            ADMIN
          </Link>

          {/* Collapse */}
          <div
            className={
              'md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded ' +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-serif p-4 px-0"
                    to="adminPannel"
                  >
                    ADMIN
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow('hidden')}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* Form */}
            <form className="mt-6 mb-4 md:hidden">
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  placeholder="Search"
                  className="px-3 py-2 h-12 border border-solid  border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                />
              </div>
            </form>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              USER MANAGEMENT
            </h6>
            {/* Navigation */}
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="items-center">
                <Link
                  className="text-xs uppercase py-3 font-bold block duration-300 hover:bg-[#ffffff] hover:text-black hover:rounded-lg hover:px-3"
                  to="add-users"
                >
                  <i className="fas fa-tv mr-2 text-sm"></i> Add User
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className="text-xs uppercase py-3 font-bold block duration-300 hover:bg-[#ffffff] hover:text-black hover:rounded-lg hover:px-3"
                  to="view-users"
                >
                  <i className="fas fa-tools mr-2 text-sm"></i> View Users
                </Link>
              </li>
            </ul>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              MOVIE MANAGEMENT
            </h6>
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <li className="items-center">
                <Link
                  className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block duration-300 hover:bg-[#ffffff] hover:text-black hover:rounded-lg hover:px-3"
                  to="add-movies"
                >
                  <i className="fas fa-fingerprint text-blueGray-400 mr-2 text-sm"></i> Add Movies
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block duration-300 hover:bg-[#ffffff] hover:text-black hover:rounded-lg hover:px-3"
                  to="view-movies"
                >
                  <i className="fas fa-clipboard-list text-blueGray-300 mr-2 text-sm"></i> View Movies
                </Link>
              </li>
            </ul>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              THEATER MANAGEMENT
            </h6>
            {/* Navigation */}
            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <li className="items-center">
                <Link
                  className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block duration-300 hover:bg-[#ffffff] hover:text-black hover:rounded-lg hover:px-3"
                  to="add-theaters"
                >
                  <i className="fas fa-newspaper text-blueGray-400 mr-2 text-sm"></i> Add Theaters
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block duration-300 hover:bg-[#ffffff] hover:text-black hover:rounded-lg hover:px-3"
                  to="view-theaters"
                >
                  <i className="fas fa-user-circle text-blueGray-400 mr-2 text-sm"></i> View Theaters
                </Link>
              </li>
            </ul>
          </div>

          <button
            className="text-blueGray-700 bg-[#fa1b1b] rounded-xl hover:text-black-500 text-xs uppercase py-3 font-bold block duration-300 hover:bg-[#690606] hover:text-white hover:rounded-lg"
            onClick={() => {
              localStorage.removeItem('Admintoken');
              navigate('/admin');
            }}
          >
            <i className="text-blueGray-400 text-sm"></i> Log Out
          </button>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
