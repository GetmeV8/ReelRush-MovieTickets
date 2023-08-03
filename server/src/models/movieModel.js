const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
    moviename:{
        type:String,
        require:[true,"movie name is require"]
    },
    releasedate:{
        type:Date,
        require:[true,"Release date is require"]
    },
    description: {
        type:String,
        require:true
    },
    poster1: {
        type:String,
        require:true
    },
    poster2: {
        type:String,
        require:true
    },
    poster3: {
        type:String,
        require:true
    },
    genre:{
        type:String,
        require:true
    },
    language:{
        type:String,
        require:true
    },
    trailerlink:{
        type:String,
        require:true
    },
    isBlocked:{
        type:Boolean
    }
})
module.exports = mongoose.model("movies", MovieSchema);
