const express = require("express");
const router = express.Router();
const {
    allUsers,
    editUser,
    blocking,
    addUser,
    adminLogin,
    allTheatres,
    theatreAccept,
}=require("../controllers/adminControllers");
const {Register } = require("../controllers/theatreadminControllers");

//get methods.
router.get('/allUsers',allUsers);
router.get('/allTheatres',allTheatres);



//post methods
router.post("/login",adminLogin);
router.post("/add-users", addUser);
router.post("/add-theatre",Register);



//put methods
router.put('/edit-user',editUser);


//patch methods
router.post("/blocked",blocking);
router.post("/accept",theatreAccept);


module.exports = router;