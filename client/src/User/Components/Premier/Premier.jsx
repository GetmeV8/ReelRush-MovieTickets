import axios from "../../utils/axios";
import { addgenrepost, deleteGenre, getgenre } from "../../../utils/Constants";
import { Link, useParams } from 'react-router-dom'
import React, { useCallback, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import "./Premier.scss";


const Premier = () => {
  const token = useSelector((state) => state.user.token);

  const [genre, setGenre] = useState([]);

  const getOnescreen = useCallback(async () => {
    axios
      .get(getgenre, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setGenre(response.data);
      })
      .catch((error) => {
        if (error.response) {
          generateError(error.response.data.message);
        } else {
          generateError("Network error. Please try again later.");
        }
      });
  });
  useEffect(() => {
    getOnescreen();
  }, []);
  const generateError = (error) =>
    toast.error(error, {
      position: "top-right",
    });
  const handleButtonClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <div className="flex box-border  flex-col mt-36 justify-center items-center  h-[700px]. bg">
        <div className="text-center w-full  p-7 mt-[-90px] bg-zinc-900 ">
          <h2 className="text-black  text-2xl font-bold">
            CATEGORY
            <br />
            <span className="text-lg"> New Releases Every Friday</span>
          </h2>
        </div>
        <div className="flex justify-center items-center w-3/4 md:w-4/4 bg-gray-200 rounded-lg mb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4 justify-items-center w-full md:w-full bg-slate-800">
            {genre?.map((screenObj) => (
              <Link style={{ textDecoration: "none" }} key={screenObj.genre} to={`/categorymovie/${screenObj.genre}`}>
                <button
                  className="bg-black text-white  w-44 h-44 p-4 flex items-center justify-center font-semibold rounded-2xl uppercase"
                  onClick={handleButtonClick}>
                  {screenObj.genre}
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Premier
