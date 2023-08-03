const express = require("express");
const router = express.Router();
const {
    getAllData,
    allUsers,
    editUser,
    editMovies,
    blocking,
    addUser,
    adminLogin,
    allTheatres,
    theatreAccept,
    addMovie,
    allMovies,
    movieBlock,
}=require("../controllers/adminControllers");
const {Register } = require("../controllers/theatreadminControllers");

//get methods.
router.get("/allData",getAllData);
router.get('/allUsers',allUsers);
router.get('/allTheatres',allTheatres);
router.get("/allMovies",allMovies);
router.get('/movieBlock',movieBlock)



//post methods
router.post("/login",adminLogin);
router.post("/add-users", addUser);
router.post("/add-theatre",Register);
router.post("/add-movies",addMovie)



//put methods
router.put('/edit-user',editUser);
router.put('/edit-movie',editMovies);


//patch methods
router.post("/blocked",blocking);
router.post("/accept",theatreAccept);


module.exports = router;