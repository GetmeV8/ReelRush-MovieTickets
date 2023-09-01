const express = require("express");
var verifyToken = require("../middleware/authadm");
const {
  adminLogin,
  addmovies,
  getAllMovies,
  getUsers,
  getUserss,
  unblockStaff,
  blockStaff,
  getAllTheater,
  getAllTheaters,
  deleteMovie,
  editMovie,
  getMovie,
  addPoster,
  getAllPoster,
  deletePoster,
  getOneTheater,
  approve,
  reject,
  addgenre,
  getgenre,
  deleteGenre,
  getGenreone,
  editGenre,
  AdmingetOnePaymentDetails,
  AdmingetReservationDetails,
  reservationDetails,
  getDailyRevenue,
  getOneDayRevenue,
  getUnrededMessage,
  notificationCountAdmin,
  readTrueTheater,
  readTrue,
  getUnreadMEssageAllTheater,
  getLatestMessage,
} = require("../controllers/admin");
const { Admin } = require("../models/admin");
const router = express.Router();

router.post("/login", adminLogin);
router.post("/addmovies", verifyToken, addmovies); 
router.get("/movieList",verifyToken, getAllMovies);
router.get("/getAllUsers",verifyToken, getUsers);
router.get("/getAllUserss",verifyToken, getUserss);
router.patch("/unblock/:id",verifyToken, unblockStaff); 
router.patch("/block/:id",verifyToken, blockStaff); 
router.get("/getAllTheater",verifyToken, getAllTheater);
router.get("/getAllTheaters",verifyToken, getAllTheaters);
router.delete("/deleteMovie/:id", verifyToken, deleteMovie); 
router.post("/editMovie/:id",verifyToken, editMovie);
router.get("/getMovie/:id",verifyToken, getMovie);
router.post("/addPoster",verifyToken, addPoster); 
router.get("/getAllPoster", getAllPoster);
router.delete("/deletePoster/:id", verifyToken, deletePoster); 
router.get("/getOneTheater/:id", getOneTheater);
router.patch("/approveTheater/:id",verifyToken, approve); 
router.patch("/rejectTheater/:id",verifyToken, reject); 
router.post("/addgenre", verifyToken, addgenre); 
router.get("/getgenre", getgenre);
router.delete("/deleteGenre/:id", verifyToken, deleteGenre); 
router.get("/getGenreone/:id",verifyToken, getGenreone);
router.post("/editGenre",verifyToken, editGenre);
router.get("/getOnePaymentDetailss/:id",verifyToken,AdmingetOnePaymentDetails);
router.get("/reservationDetails",verifyToken, reservationDetails);
router.get("/getDailyRevenue",verifyToken, getDailyRevenue);
router.get("/getOneDayRevenue/:id",verifyToken, getOneDayRevenue);
router.get("/ReservationDetailss/",verifyToken, AdmingetReservationDetails);
router.patch("/readTrueTheater/:id/:theaterId", readTrueTheater); 
router.patch("/readTrue/:id/:adminId",verifyToken, readTrue);
router.get("/getUnreadMEssageAllTheater/:adminId/:id",getUnreadMEssageAllTheater);
router.get("/latestMessage/:id", getLatestMessage);
router.get("/notificationCountAdmin/:id",verifyToken, notificationCountAdmin);
router.get("/getUnrededMessage/:id",verifyToken, getUnrededMessage);
module.exports = router;
