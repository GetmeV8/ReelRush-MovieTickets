const express = require("express");
const router = express.Router();
const {
    allUsers,
    editUser,
    blocking,
    addUser,
    adminLogin,
}=require("../controllers/adminControllers");

//get methods.
router.get('/allUsers',allUsers)



//post methods
router.post("/login",adminLogin);
router.post("/add-users", addUser);



//put methods
router.put('/edit-user',editUser);


//patch methods
router.post("/blocked",blocking);


module.exports = router;