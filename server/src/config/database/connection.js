const mongoose = require('mongoose');
const state = { 
    db:null
}
module.exports.connect = function (done) {
    const url = "mongodb://localhost:27017/ReelRush"
    const dbname = 'ReelRush';

    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => console.log('DB connected'))
    .catch((err) => console.log(`MongoDB connection error: ${err}`));

}

module.exports.get = function(){
    return state.db;
}