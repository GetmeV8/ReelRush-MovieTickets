const theatreAdminModel = require("../models/theatreadminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const theatreadminModel = require("../models/theatreadminModel");


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

    // try {
    //   const { email, password, name, place } = req.body;
    //   console.log(req.body);

    //   // Create a new TheatreAdmin with the provided data
    //   const newTheatreAdmin = new theatreAdminModel({
    //     email,
    //     name,
    //     place,
    //     password,
    //     accepted: false, // Set accepted to false by default
    //   });

    //   // Save the new TheatreAdmin to the database
    //   const savedTheatreAdmin = await newTheatreAdmin.save();
    //   // Send success response with the saved TheatreAdmin
    //   res.json({ TheatreAdmin: savedTheatreAdmin, created: true });
    // } catch (error) {
    //   // Handle errors using the handleErrors function
    //   const errors = handleErrors(error);
    //   console.log(errors)
    //   res.status(400).json({ errors, created: false });
    // }
    try {
      const { email, password, name, place } = req.body;
      console.log(req.body);
  
      // Create a new TheatreAdmin with the provided data
      const autherize = { accepted: false };
      const newTheatreAdmin = new theatreAdminModel({
        email,
        name,
        place,
        password,
        ...autherize,
      });
  
      // Save the new TheatreAdmin to the database
      const savedTheatreAdmin = await newTheatreAdmin.save();
  
      // Send success response with the saved TheatreAdmin
      res.status(201).json({ TheatreAdmin: savedTheatreAdmin, created: true });
    } catch (error) {
      console.error(error);
  
      // Handle errors using the handleErrors function
      const errors = handleErrors(error);
      res.status(400).json({ errors, created: false });
    }


  },


  Login: async (req, res, next) => {

    // try {
    //     const { email, password } = req.body;
    //     console.log(email, password);
    //     const TheatOwner = await theatreAdminModel.findOne({ email });
    //     console.log(TheatOwner);
    //     if (TheatOwner) {
    //         bcrypt.compare(password, TheatOwner.password, function (err, result) {
    //             if (result === true) {
    //                 const token = jwt.sign({ email }, "secret");
    //                 if (TheatOwner.accepted === true) {
    //                     res.json({ token: token, created: true });
    //                     console.log("Password match");
    //                 } else {
    //                     res.json({ token: token, error: "Admin Not accepted" });
    //                 }
    //             } else {
    //                 res.json({ error: "Invalid email or password" });
    //                 console.log("Passwords do not match.");
    //             }
    //         });
    //     } else {
    //         res.json({ error: "Invalid email or password" });
    //     }
    // } catch (error) {
    //     res.status(404).send(error);
    // }
    try {
      const { email, password } = req.body;

      // Find the TheatreAdmin by email
      const theaterOwner = await theatreAdminModel.findOne({ email });

      if (theaterOwner) {
        // Compare passwords using comparePasswords function
        const passwordMatch = await comparePasswords(password, theaterOwner.password);

        if (passwordMatch) {
          const token = jwt.sign({ email }, "secret");

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









}