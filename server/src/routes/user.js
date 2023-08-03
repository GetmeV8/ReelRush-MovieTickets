const express = require('express');
const {
   register,
   login,
   newrelease,
} = require('../controllers/userControllers');
//    const express = require("express");
const router = express.Router();


// Get method
router.get("/new-releases",newrelease);






//post methods
router.post("/signup", register);
router.post("/login",login);
// router.post("/verify",verify);


module.exports = router;