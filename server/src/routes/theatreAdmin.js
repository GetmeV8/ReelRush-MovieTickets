const express = require("express");
const router = express.Router();
const {
    Register,
    Login,
    AutherizedCheck,
    AddScreen,
    ViewScreen,
    DeleteScreen,
    AddShow,
    Screens,
    ScreenedMovies,
} = require("../controllers/theatreadminControllers");
const authMiddleware = require("../middlewares/authMiddlewares");

//Get methods
// router.get("/checkAutherized",authMiddleware,AutherizedCheck);
router.get("/view-screen", authMiddleware, ViewScreen);
router.get("/screen",authMiddleware,Screens);
router.get("/Screened-Movies",authMiddleware,ScreenedMovies);


//Post methods
router.post("/register", Register);
router.post("/login",Login);
router.post("/add-screen", authMiddleware, AddScreen);
router.post("/addShow",authMiddleware,AddShow);



router.delete("/view-screen/:screenId",authMiddleware,DeleteScreen);





module.exports = router;

