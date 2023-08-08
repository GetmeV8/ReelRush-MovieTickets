const express = require('express');
const {
   register,
   login,
   newrelease,
   singleMovie,
   findtheatre,
   findShow,
   seatusage,
   seatbooking,
   order,
   confirmPayment,
} = require('../controllers/userControllers');
const verifyAuth = require("../middlewares/authMiddlewares")
//    const express = require("express");
const router = express.Router();


// Get method
router.get("/new-releases",newrelease);
router.get("/Movie/:id",singleMovie);
router.get("/findtheater/:id", findtheatre);
router.get("/findShow/:id", findShow);






//post methods
router.post("/signup", register);
router.post("/login",login);
router.post("/seatusage", seatusage);
router.post("/seatbook",verifyAuth,seatbooking)
router.post("/order",verifyAuth,order)
router.post("/confirmPayment",verifyAuth,confirmPayment);

// router.post("/verify",verify);


module.exports = router;