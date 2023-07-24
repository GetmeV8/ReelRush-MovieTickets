const express = require("express");
const router = express.Router();
const {Register,Login,AutherizedCheck} = require("../controllers/theatreadminControllers");
const authMiddleware=require("../middlewares/authMiddlewares");

//Get methods
router.get("/checkAutherized",authMiddleware,AutherizedCheck);


//Post methods
router.post("/register",Register);
router.post("/login",Login);


module.exports=router;

