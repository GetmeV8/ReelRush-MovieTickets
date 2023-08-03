import React from "react";
import Adminaxios from "../../../Assets/axiosForAdmin";
import { useState, useEffect } from "react";
import EditModal from "../../../Components/Admin/Tables/editMovie";
import { Link } from "react-router-dom"
import swal from "sweetalert";
// import ReactPaginate from 'react-paginate'

const Viewmovies = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(0)
  const [length, SetLength] = useState()
  const itemsPerPage = 5


  const toggleBlocked = (id, e, index, moviename) => {
    const value = [...movies];
    value[index].isBlocked = e.target.checked; 
    const status = e.target.checked
    setMovies(value)
    swal({
      title: status ? `Blocked` : `Unblocked`,
      text: moviename + (status ? ` Blocked` : ` Unblocked`),
    });
    Adminaxios.get(`/admin/movieBlock`, {
      params: {
        id: id,
        isBlocked: e.target.checked
      }
    }
    ).then((resp) => {

    })
  };

  useEffect(() => {
    Adminaxios.get("/admin/allMovies").then((resp) => {
      setMovies(resp.data);
      SetLength(resp.data.length)
    });
  }, []);
  function getCurrentPageData() {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return movies.slice(startIndex, endIndex);
  }
  return (
    <>
      <div className=" mt-10 flex justify-center items-center">
        <div className="relative overflow-x-auto ">
          <table className="text-sm text-left text-white rounded-2xl">
            <thead className="text-xs uppercase bg-gray-500 dark:bg-gray-800 text-center text-white">
              <tr>
                <th scope="col" className="px-6 py-3">
                  image
                </th>
                <th scope="col" className="px-6 py-3">
                  Movie name
                </th>
                <th scope="col" className="px-6 py-3">
                  Genre
                </th>
                <th scope="col" className="px-6 py-3">
                  language
                </th>
                <th scope="col" className="px-6 py-3">
                  Trailer link
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
                <th scope="col" className="px-6 py-3">
                  Block
                </th>
              </tr>
            </thead>
            <tbody>
              {getCurrentPageData().map((movie, index) => (
                <tr className="bg-white border-b" key={index}>
                  <td className="px-6 py-1 text-black font-medium">

                    <Link to={`/movie/${movie._id}`}> <img width={50} src={movie.poster1} alt="" /></Link>

                  </td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900  dark:text-black"
                  >
                    {movie.moviename}
                  </th>

                  <td className="px-6 py-4 text-black font-medium">
                    {movie.genre}
                  </td>
                  <td className="px-6 py-4 text-black font-medium">
                    {movie.language}
                  </td>
                  <td className="px-6 py-4 text-black font-medium">
                    <a
                      href={movie.trailerlink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="truncate bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Play Video
                    </a>
                  </td>
                  <td className="px-6 pt-4 items-center flex justify-center">

                    <EditModal movie={movie} />
                  </td>
                  <td className="px-6 pt-4 items-center   justify-center">
                    <input
                      type="checkbox"
                      id={movie._id}

                      checked={movie.isBlocked}
                      value={movie}
                      onChange={(e) => {
                        toggleBlocked(movie._id, e, index, movie.moviename)
                      }}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
          {/* <ReactPaginate
            pageCount={Math.ceil(movies.length / itemsPerPage)}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            onPageChange={({ selected }) => setCurrentPage(selected)}
            containerClassName="flex justify-center my-5"
            activeClassName="font-medium bg-blue-700 text-white py-1 px-3"
            pageClassName="font-medium text-gray-500 rounded-md py-1 px-3 mx-1 cursor-pointer hover:text-blue-700 hover:bg-gray-200"
            previousClassName="font-medium text-gray-500 rounded-md py-1 px-3 mx-1 cursor-pointer hover:text-blue-700 hover:bg-gray-200"
            nextClassName="font-medium text-gray-500 rounded-md py-1 px-3 mx-1 cursor-pointer hover:text-blue-700 hover:bg-gray-200"
            breakClassName="font-medium text-gray-500 rounded-md py-1 px-3 mx-1 cursor-pointer hover:text-blue-700 hover:bg-gray-200"
            previousLabel="<<"
            nextLabel=">>"
          /> */}
        </div>
      </div>
    </>
  );
};

export default Viewmovies;
