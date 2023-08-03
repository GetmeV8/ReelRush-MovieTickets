const theatreAdminModel = require("../models/theatreadminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const movieModel = require("../models/movieModel");
const showModel = require("../models/showModel");
// const theatreadminModel = require("../models/theatreadminModel");


const handleErrors = (error) => {
  let errors = { email: "", password: "" };
  if (error.code === 11000) {
    errors.email = "Email is already registered";
    return errors;
  }
};

const comparePasswords = (password, hashedPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hashedPassword, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};


module.exports = {


  Register: async (req, res) => {

    try {
      const { email, password, name, place } = req.body;
      console.log(req.body);

      // Create a new TheatreAdmin with the provided data
      const newTheatreAdmin = new theatreAdminModel({
        email,
        name,
        place,
        password,
        accepted: false, // Set accepted to false by default
      });

      // Save the new TheatreAdmin to the database
      const savedTheatreAdmin = await newTheatreAdmin.save();
      // Send success response with the saved TheatreAdmin
      res.json({ TheatreAdmin: savedTheatreAdmin, created: true });
    } catch (error) {
      // Handle errors using the handleErrors function
      const errors = handleErrors(error);
      console.log(errors)
      res.status(400).json({ errors, created: false });
    }
  },


  Login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      // Find the TheatreAdmin by email
      const theaterOwner = await theatreAdminModel.findOne({ email });

      if (theaterOwner) {
        // Compare passwords using comparePasswords function
        // const passwordMatch = await comparePasswords(password, theaterOwner.password);
        let passwordMatch=false
        console.log(theaterOwner.password)
        if(password===theaterOwner.password){
          passwordMatch=true
        }
        if (passwordMatch) {
          const token = jwt.sign({ email }, "secret");
          console.log(token);
          if (theaterOwner.accepted === true) {
            // Send success response with token
            res.json({ token, created: true });
            console.log("Password match");
          } else {
            // Send error response for unaccepted admin
            res.json({ token, error: "Admin Not accepted" });
          }
        } else {
          // Send error response for invalid password
          res.json({ error: "Invalid email or password" });
          console.log("Passwords do not match.");
        }
      } else {
        // Send error response for invalid email
        res.json({ error: "Invalid email or password" });
      }
    } catch (error) {
      // Handle other errors
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Middleware function to check if the user is authorized
  // AutherizedCheck: async (req, res, next) => {
  //   // Extract the email from the user object in the request (assuming it's set in a previous middleware)
  //   const { email } = req.user;
  //   try {
  //     // Find the theater owner in the database based on the email
  //     const theaterOwner = await theatreAdminModel.findOne({ email: email });
  //     if (theaterOwner) {
  //       // If theater owner is found, send the response with the theaterOwner object
  //       res.json({ resp: theaterOwner });
  //     } else {
  //       // If theater owner is not found, send a response with the "Cannot find user" message
  //       res.json({ msg: "Cannot find user" });
  //     }
  //   } catch (error) {
  //     // If any errors occur during the process, send a 404 status code with the error message
  //     res.status(404).send(error);
  //   }
  // },


  AddScreen: async (req, res, next) => {
    try {
      console.log("reached here for gods sake")
      const { email } = req.user;
      const { name, totalcount, rowcount, columncount, screentype } = req.body;

      const data = {
        name,
        seating_capacity: totalcount,
        row: rowcount,
        column: columncount,
        screen_type: screentype,
      };

      await theatreAdminModel.updateOne({ email }, { $push: { screens: data } });
      res.status(200).json({ created: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ created: false, error: "An error occurred" });
    }
  },
  ViewScreen: async (req, res, next) => {
    const { email } = req.user;
    try {
      const theaterOwner = await theatreAdminModel.findOne({ email }).exec();
      res.json(theaterOwner);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  Screens: async (req, res, next) => {
    try {
      const { email } = req.user;
      const theaterOwner = await theatreAdminModel.findOne({ email: email });

      if (!theaterOwner) {
        return res.status(404).json({ error: 'Theater owner not found' });
      }

      // Theater owner found, send the response
      return res.json(theaterOwner);
    } catch (error) {
      // Handle any other errors that may occur
      console.log(error);
      return res.status(500).json({ error: 'Something went wrong' });
    }
  },

  DeleteScreen: async (req, res, next) => {
    console.log("hello People")
    const { email } = req.user;
    const screenId = req.params.screenId; // Assuming you pass the screen ID as a URL parameter (e.g., /theater/delete-screen/:screenId)

    try {
      // First, find the TheaterOwnerModel based on the email
      const theaterOwner = await theatreAdminModel.findOne({ email });

      if (!theaterOwner) {
        // If the TheaterOwnerModel is not found, return an error
        return res.status(404).json({ error: 'Theater owner not found' });
      }

      // Find the index of the screen to be deleted in the screens array
      const screenIndex = theaterOwner.screens.findIndex((screen) => screen._id.toString() === screenId);

      if (screenIndex === -1) {
        // If the screen is not found in the screens array, return an error
        return res.status(404).json({ error: 'Screen not found' });
      }

      // Remove the screen from the screens array
      theaterOwner.screens.splice(screenIndex, 1);

      // Save the updated theaterOwner document
      await theaterOwner.save();

      // Return a success message
      res.json({ success: true });
    } catch (error) {
      // Handle other errors
      res.status(500).json({ error: 'Server error' });
    }
  },

  AddShow: async (req, res, next) => {
    const { email } = req.user;
    let Theater = await theatreAdminModel.findOne({ email: email });
    let Movie = await movieModel.findOne({ _id: req.body.movie });
    let Times = req.body.ShowTimes.map((showtimes) => {
      return showtimes.value;
    });
    const screen = Theater.screens.find(
      (screen) => screen._id == req.body.screen
    );
    const newData = {
      startDate: new Date(req.body.startDate),
      EndDate: new Date(req.body.EndDate),
      ShowTimes: Times,
      TicketPrice: req.body.TicketPrice,
      Movie: Movie,
      theater: {
        name: Theater.name,
        email: Theater.email,
        address: Theater.place,
        screen: screen,
      },
    };
    try {
      console.log(newData);
      showModel.create(newData).then((resp) => {
        res.send({ msg: "Screen Added Successfully", created: true });
      });
    } catch (error) {
      res.status(404).send(error);
    }
  },
  ScreenedMovies:async (req, res, next) => {
    const { email } = req.user;
    try {
      showModel.find({ "theater.email": email }).sort({'EndDate': -1})
        .then((ScreenedMovies) => {
          res.status(200).send(ScreenedMovies);
        })
        .catch((err) => {
          res.status(404).send(err);
        });
    } catch (error) {
      res.status(404).send(error);
    }
  },











}