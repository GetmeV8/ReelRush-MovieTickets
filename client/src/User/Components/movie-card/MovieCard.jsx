import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import "./movie-card.scss";
import axios from "../../utils/axios";
import { Link } from "react-router-dom";
import { usergetMovies, addWishlist, removeWishlist } from "../../../utils/Constants";
import { useSelector, useDispatch } from "react-redux";
import { setMovies, setWishlist, setLogin, hideLoading, showLoading } from "../../../state/user/userSlice";
import { toast, ToastContainer } from "react-toastify";
import IconButton from "@mui/material/IconButton";
import Favorite from "@mui/icons-material/Favorite";



const MovieCard = (props) => {
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const wishlist = useSelector((state) => state.user?.wishlist || []);
  const searchKey = useSelector((state) => state.searchKey);
  const [movies, getAllMovie] = useState([]);
  const dispatch = useDispatch();
  const userId = user ? user._id : null;
  useEffect(() => {
    dispatch(showLoading())
    getAllMovieList();
  }, []);

  const generateError = (error) =>
    toast.error(error, {
      position: "top-right",
    });
  const getAllMovieList = () => {
    axios
      .get(usergetMovies)
      .then((response) => {
        dispatch(setMovies(response.data)); // Pass response.data instead of { movies }

        getAllMovie(response.data);
        dispatch(hideLoading())
      })
      .catch((error) => {
        if (error.response) {
          generateError(error.response.data.message);
        } else {
          generateError("Network error. Please try again later.");
        }
      });
  };
  const handleWishlist = (movieId, movieTitle) => {
    if (wishlist.includes(movieId)) {
      axios
        .post(removeWishlist, {
          movieTitle,
          movieId,
          userId,
        },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          const updatedWishlist = response.data.wishlist;
          console.log(updatedWishlist, ">>>>>>>>>>>>>>>>>>>>>><<<<<okayy")
          const updatedUser = { ...user, wishlist: updatedWishlist };
          dispatch(setLogin({ user: updatedUser, token: token }));
          toast.error("Movie removed from FAVOURITES!", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
        })
        .catch((error) => {
          if (error.response) {
            generateError(error.response.data.message);
          } else {
            generateError("Network error. Please try again later.");
          }
        });
    } else {
      axios
        .post(addWishlist, {
          movieTitle,
          movieId,
          userId,
        },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          const updatedWishlist = response.data.wishlist;
          console.log(updatedWishlist, ">>>>>>>>>>>>>>>>>>>>>><<<<<okayy")
          const updatedUser = { ...user, wishlist: updatedWishlist };
          dispatch(setLogin({ user: updatedUser, token: token }));
          toast.success("Movie added to FAVOURITES!", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
        })
        .catch((error) => {
          if (error.response) {
            generateError(error.response.data.message);
          } else {
            generateError("Network error. Please try again later.");
          }
        });
    }
  };
  return (
    <>
      <div className="card-container">
        {props.searchedMovies &&
          props.searchedMovies.map((movie, index) => {
            return (
              <Link
                to={`/MovieDetails/${movie._id}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  className="movie-card"
                  style={{ backgroundImage: `url(${movie.imageUrl})` }}
                >
                  <div style={{ textAlign: "center" }}>
                    <Link style={{ textDecoration: "none" }}>
                      <h5 className="namemove">
                        {" "}
                        <Button variant="contained" color="error">
                          Book
                        </Button>
                        <br /> <br />
                        <br />
                        <h2>{movie.title}</h2> <br />
                        <br />
                        <span style={{ color: "red" }}>{movie.genre}</span>
                        <span style={{ paddingLeft: "20px", color: "red" }}>
                          {movie.duration}{" "}
                          <span style={{ color: "red" }}>min</span>
                        </span>
                      </h5>
                    </Link>
                  </div>
                </div>
              </Link>
            );
          })}
        {searchKey?.length === 0 &&
          movies.map((movie, index) => {
            return (
              <Link
                to={`/MovieDetails/${movie._id}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  className="movie-card"
                  style={{ backgroundImage: `url(${movie.imageUrl})` }}
                > {user ? (
                  <IconButton
                    onClick={(e) => {
                      e.preventDefault(); // Prevent default navigation behavior
                      handleWishlist(movie._id, movie.title);
                    }}
                    aria-label="add to favorites"
                    color={wishlist.includes(movie._id) ? "error" : "primary"}
                  >
                    &nbsp; &nbsp;
                    <Favorite />
                  </IconButton>
                ) : (
                  ""
                )}
                  <div style={{ textAlign: "center" }}>
                    <Link
                      to={`/BokingDetails/${movie._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <h5 className="namemove">
                        {" "}
                        <Button variant="contained" color="error">
                          Book
                        </Button>
                        <br />
                        <br /> <br />
                        <h2>{movie.title}</h2> <br />
                        <br />
                        <span style={{ color: "red" }}>{movie.genre}</span>
                        <span style={{ paddingLeft: "20px", color: "yellow" }}>
                          {movie.duration}{" "}
                          <span style={{ color: "white" }}>min</span>
                        </span>
                      </h5>
                    </Link>
                  </div>


                </div>
              </Link>
            );
          })}
      </div>

    </>
  );
};

export default MovieCard;
