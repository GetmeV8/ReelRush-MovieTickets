const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
// const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const db = require('./config/database/connection')
const user = require('./routes/user');
const admin = require('./routes/admin');
const theatreadmin = require('./routes/theatreAdmin')

const app = express()



app.use(morgan('dev'))
app.use(cors({ credentials: true, origin: true }));
// app.use(
//   cors({
//     origin: ["*", ""],
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
//     // credentials: true,
//     allowedHeaders: ['Content-Type', 'Authorization']
//   })
// );
app.use(express.json())
app.use(express.urlencoded({extended:false}))
// app.use(cookieParser())
app.use('/', user)
app.use('/admin', admin);
app.use('/theatreAdmin', theatreadmin);



db.connect((err) => {
  if (err) console.log('connection error' + err)

  else console.log('Database connected')

})


app.listen(8080, (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log('App listening to Port 8080')
  }

})



