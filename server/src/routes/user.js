const express = require('express');
const {
   register,
   login,
} = require('../controllers/userControllers');
//    const express = require("express");
const router = express.Router();


// Get method






//post methods
router.post("/signup", register);
router.post("/login",login);
// router.post("/verify",verify);


module.exports = router;