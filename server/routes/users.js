var userverifyToken = require("../middleware/authusr");

const express = require("express");
const {
  UserSignup,
  userLogin,
  getMovies,
  googleSignup,
  otpLogin,
  userOtpSend,
  getAllPoster,
  addprofileinfo,
  getMovie,
  addReview,
  getReview,
  deleteReview,
  searchMovie,
  categorymovie,
  getAllCity,
  getScreenShows,
  seatReserved,
  reservation,
  getQrCode,
  addWishlist,
  getUserHistory,
  cancelTicket,
  removeWishlist
} = require("../controllers/user");
const router = express.Router();

router.post("/", UserSignup);
router.post("/login", userLogin);
router.get("/MovieList", getMovies);
router.post("/googleSignup", googleSignup);
router.post("/otplogin/:email", otpLogin);
router.post("/sendOtp", userOtpSend);
router.get("/getAllPoster", getAllPoster);
router.post("/editprofile",userverifyToken,addprofileinfo);
router.get("/getMovie/:id", getMovie);
router.post("/reviews", userverifyToken, addReview);
router.delete("/deleteReview/:id/:date",userverifyToken, deleteReview);
router.get("/getAllReview/:id",userverifyToken, getReview);
router.get("/searchMovie/:key", searchMovie);
router.get("/categorymovie/:id/:userId?",categorymovie);
router.get("/getAllCity", getAllCity);
router.get("/getScreenShows/:id/:title",userverifyToken, getScreenShows);
router.get("/seatReserved/:id/:time/:movieId/:date",userverifyToken, seatReserved);
router.post("/reservation/:id/:total/", reservation);
router.get("/getQrcode/:movieId",userverifyToken, getQrCode);
router.post("/addWishlist",userverifyToken,addWishlist);
router.post("/removeWishlist",userverifyToken,removeWishlist);
router.get("/history/:id", userverifyToken, getUserHistory);
router.delete("/cancelTicket/:id", userverifyToken, cancelTicket); 

module.exports = router;
