import React, { useEffect, useState } from "react";
import "./detail.scss";
import CastList from "./CastList";
import MovieList from "../../Components/movie-list/MovieList";
import Navbar from "../../Components/Navbar/Navbar";
import axios from "../../../utils/axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import Rating from "../../Components/Rating/Rating";
import ReviewModel from "../../Components/Review/Review";
import { setMovies, setWishlist,setLogin } from "../../../state/user/userSlice";
import { useSelector,useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import ShowReview from "../../Components/Review/showReview";
import { Box, Divider } from "@mui/material";
import Swal from "sweetalert2";
import { getAllReview, getMovie,addWishlist,removeWishlist, userGetMovie } from "../../../utils/Constants";
import { toast, ToastContainer } from "react-toastify";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
const Moviedetails = () => {

  const wishlist = useSelector((state) => state.user?.wishlist || []);
  let { id: movieId } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user?.user);
  const token = useSelector((state) => state.user?.token);
  const [open, setOpen] = React.useState(false);
  const [submit, setsubmit] = useState(false);
  const [review, setreview] = useState();
  const [movies, getMoviee] = useState([]);
  const userId = user ? user._id : null;
  const dispatch = useDispatch();
  const handleOpen = () => {
    if (user?.username) {
      setOpen(true);
    } else {
      Swal.fire({
        title: "Please login to book your tickets",
        icon: "warning",
        confirmButtonColor: "green",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        background: "black",
        color: "white",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }
  };
  const generateError = (error) =>
    toast.error(error, {
      position: "top-right",
    });


  const getOneMovie = () => {
    try {
      console.log("got here")
      axios
        .get(`${userGetMovie}/${movieId}`)
        .then((response) => {
          console.log(response, "in get one movie")
          getMoviee(response.data);
        })
        .catch((error) => {
          if (error.response) {
            generateError(error.response.data.message);
          } else {
            generateError("Network error. Please try again later.");
          }
        });
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        generateError(error.response.data.message);
      }
    }
  };

  const getReview = async () => {
    const { data } = await axios.get(`${getAllReview}/${movieId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    setreview(data);
  };

  useEffect(() => {
    getOneMovie();
  }, [movieId]);

  useEffect(() => {
    getReview();
  }, [submit]);

  const ratings = movies.Review?.map((review) => review.rating);

  const totalRatings = ratings?.reduce((acc, rating) => acc + rating, 0);

  const averageRating = totalRatings / ratings?.length;

  const ratingPercentage = averageRating * 100; // calculate the rating percentage out of 100

  const image =
    "https://t4.ftcdn.net/jpg/03/98/67/05/360_F_398670578_qfihCy61VOBGpuvWolQ8U87H2cqmeJ8L.jpg";
    const handleWishlist = (movieId, movieTitle) => {
      if (wishlist.includes(movieId)){
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
         const updatedUser = {...user,wishlist:updatedWishlist };
         dispatch(setLogin({ user:updatedUser, token:token }));
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
      }  else {
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
           const updatedUser = {...user,wishlist:updatedWishlist };
           dispatch(setLogin({ user:updatedUser, token:token }));
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
    <div style={{ backgroundColor: "black" }}>
      <Navbar />
      <>
        <div
          className="bannner"
          style={{ width: "100%", backgroundImage: `url(${image})` }}
          
        ></div>
        <div className="mb-3 movie-content container">
          <div className="movie-content__poster">
            <div
              className="movie-content__poster__img"
              style={{ backgroundImage: `url(${movies?.imageUrl})` }}
            >         {user ? (
              <IconButton
                onClick={(e) => {
                  e.preventDefault(); // Prevent default navigation behavior
                  handleWishlist(movies._id, movies.title);
                }}
                className="wishlist-button"
                aria-label="add to favorites"
                color={wishlist.includes(movies._id) ? "error" : "primary"}
              >
                  {wishlist.includes(movies._id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
            ) : (
              ""
            )}
            </div>
          </div>
          <div className="movie-content__info">
            <h1 className="title">{movies?.title}</h1>
            <div className="genres">
              <span className="genres__items">{movies?.genre}</span>
            </div>

            <div className="cast">
              <div className="section__header">
                <h2>{movies?.director}</h2>
              </div>
              <br />
              {!!ratingPercentage && (
                <Rating
                  value={ratingPercentage}
                  ratingPercentage={averageRating.toFixed(1)}
                />
              )}
              <CastList />
            </div>
   
            <div className="genres">
              <Link
                to={`/BokingDetails/${movieId}`}
                style={{ textDecoration: "none" }}
              >
                <span className="genres__item">BOOK MOVIE TICKET</span>
              </Link>
            </div>
            <div className="movieDetails">
              <div className="details text-white mt-5 max-w-4xl">
                <h2 className="text-2xl font-bold">About the Movie</h2>
                <br />
                <br />
                <p>"{movies?.description}"</p>
              </div>
              <br />
              <div className="lines mb-4"></div>
              <div className="details text-white">
                <div className=" rate flex justify-between bg-gray-800 py-2 rounded-xl max-w-max">
                  <div className="review px-1 rounded flex flex-col justify-center">
                    <h3 className="text-lg m-0 font-medium">
                      Add your rating & review
                    </h3>

                    <p className="m-0 font-normal text-base text-gray-300">
                      Your rating matters
                    </p>
                  </div>
                  <div style={{ paddingTop: "13px", paddingLeft: "10px" }}>
                    <Button
                      className="BTS"
                      variant="contained"
                      color="error"
                      style={{ cursor: "pointer" }}
                      onClick={handleOpen}
                    >
                      Rate now
                    </Button>
                  </div>
                  <ReviewModel
                    open={open}
                    setOpen={setOpen}
                    setsubmit={setsubmit}
                  />
                </div>
              </div>
            </div>
            <br />
            <br />
          </div>
        </div>
        <Box >
          {movies ? (
            <ShowReview
              movieReviews={review}
              movieInfo={movies}
              submit={submit}
            />
          ) : (
            ""
          )}
          <Divider
            sx={{
              display: { xs: "block", md: "none" },
            }}
          />
        </Box>

        <div className="contain">
          <div className="section mb-3">
            <MovieList type="similar" />
          </div>
        </div>
      </>
      <ToastContainer />
    </div>
  );
};

export default Moviedetails;
