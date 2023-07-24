const mongoose =  require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema({
    email:{
        type:String,
        require:[true,"Email is required"],
        unique:true,
    },
    password:{
        type:String,
        rquire:[true,"password is required."],
    }
})

module.exports = mongoose.model("admins",adminSchema);