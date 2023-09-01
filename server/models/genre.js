const mongoose = require("mongoose")

const genreSchema = new mongoose.Schema({
 
  genre: {
    type: String,
  },
  
  
    },
      {
        timestamps:true
      }
)


const genre = mongoose.model("genre",genreSchema)
module.exports = genre
