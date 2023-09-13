var Loginvalidate = require("../utils/validate");
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const Movie = require("../models/Movie");
const jwt = require("jsonwebtoken");
const userotp = require("../models/userOtp");
const nodemailer = require("nodemailer");
const poster = require("../models/Poster");
const { Theater } = require("../models/Theater");
const Reservation = require("../models/ReservationModel");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const generateQR = require("../utils/generateQr");

//Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAIL_USER,
    pass: process.env.NODEMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});


module.exports = {
  UserSignup: async (req, res) => {
    try {
      const { error } = validate(req.body);
      if (error)
        return res.status(400).send({ message: error.details[0].message });

      const user = await User.findOne({ email: req.body.email });

      if (user)
        return res
          .status(409)
          .send({ message: "User with given email already Exist!" });

      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashPassword = await bcrypt.hash(req.body.password, salt);

      await new User({ ...req.body, password: hashPassword }).save();
      res.status(201).send({ message: "User created successfully" });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" + error });
    }
  },
  userLogin: async (req, res) => {
    try {
      var { error } = Loginvalidate(req.body);
      if (error)
        return res.status(400).send({ message: error.details[0].message });

      var user = await User.findOne({ email: req.body.email });
      if (!user)
        return res.status(401).send({ message: "Invalid Email or Password" });

      if (user.Block) return res.status(409).send({ message: "User Blocked!" });

      var validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword)
        return res.status(401).send({ message: "Invalid Emailor Password" });

      var token = user.generateAuthToken();

      res.status(200).json({ token, user });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" + error });
    }
  },
  googleSignup: async (req, res) => {
    try {
      var user = await User.findOne({ email: req.body.email });
      if (!user)
        return res.status(401).send({ message: "Invalid Email or Password" });

      if (user.Block) return res.status(409).send({ message: "User Blocked!" });

      var token = user.generateAuthToken();

      res.status(200).json({ token, user });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" + error });
    }
  },
  getMovies: async (req, res) => {
    try {
      const movies = await Movie.find();
      res.json(movies);
    } catch (error) {
      res.status(500).json({ message: "something went wrong" + error });
    }
  },
  searchMovie: async (req, res) => {
    try {
      const movie = await Movie.find({ title: { $regex: req.params.key } });
      res.status(200).json({ message: "Sucess", movie });
    } catch (error) {
      res.status(500).json({ message: "something went wrong" + error });
    }
  },
  otpLogin: async (req, res) => {

    try {

      const email = req.params.email;
      var user = await User.findOne({ email: email });

      if (!user)
        return res.status(401).send({ message: "Invalid Email or Password" });

      if (user.Block)
        return res.status(401).send({ message: "You are Blocked !" });

      var token = user.generateAuthToken();
      res.status(200).json({ token, user });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" + error });
    }
  },
  //User Send Otp
  userOtpSend: async (req, res) => {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ message: "Please enter your email" });
    }

    try {
      const user = await User.findOne({ email: req.body.email });

      if (user) {
        const OTP = Math.floor(100000 + Math.random() * 900000);

        const existEmail = await userotp.findOne({ email: email });

        if (existEmail) {
          const updateData = await userotp.findByIdAndUpdate(
            { _id: existEmail._id },
            {
              otp: OTP,
            },
            { new: true }
          );
          await updateData.save();

          const mailOptions = {
            from: process.env.Email,
            to: email,
            subject: "Sending Email for Otp Validation",
            text: `OTP:-${OTP}`,
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              res.status(400).json({ message: "Email not Send" });
            } else {
              res
                .status(200)
                .json({ message: "Email sent Successfully", otp: OTP });
            }
          });
        } else {
          const saveOtpData = new userotp({ email, otp: OTP });
          await saveOtpData.save();
          const mailOptions = {
            from: process.env.NODEMAIL_USER,
            to: email,
            subject: "Sending Email for Otp Validation",
            text: `OTP:-${OTP}`,
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              res.status(400).json({ message: "Email not Send" });
            } else {
              res
                .status(200)
                .json({ message: "Email sent Successfullyy", otp: OTP });
            }
          });
        }
      } else {
        res.status(400).json({ message: "This user is not exist in our db" });
      }
    } catch (error) {
      res.status(400).json({ message: "Invalid Details", error });
    }
  },
  getAllPoster: async (req, res) => {
    try {
      const Allposter = await poster.find().sort({ createdAt: -1 });
      res.json(Allposter);
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" + error });
    }
  },
  addprofileinfo: async (req, res) => {
    const userId = req.body.userId;
    delete req.body.userId;
    const { username, phone, place, city, pincode, imageUrl, address, email } =
      req.body.application;

    try {
      const update = await User.findOneAndUpdate(
        { _id: Object(userId) },
        {
          username: username,
          email: email,
          phone: phone,
          place: place,
          city: city,
          pincode: pincode,
          imageUrl: imageUrl,
          address: address,
        },
        { new: true }
      );
      res.status(200).json({ message: "Sucess", update });
    } catch (error) {
      res.status(500).json({ message: "something went wrong" + error });
    }
  },
  getMovie: async (req, res) => {
    const movieId = req.params.id;
    try {
      console.log(movieId, "get movies")
      const movie = await Movie.findOne({ _id: movieId });
      console.log("get movies",movie)
      res.json(movie);
    } catch (error) {
      res.status(500).json({ message: "something went wrong" + error });
    }
  },
  addReview: async (req, res) => {
    try {
      const { movieId, rating, message, userEmail } = req.body;

      if (!movieId) {
        return res.status(400).json({ message: "Movie ID is missing" });
      }
      const user = await User.findOne({ email: userEmail });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      const review = {
        userName: user.username,
        rating,
        message,
        date: new Date(),
      };

      const movie = await Movie.findByIdAndUpdate(
        { _id: movieId },
        { $push: { Review: review } },
        { new: true }
      );

      if (!movie) {
        return res.status(400).json({ message: "Movie not found" });
      }
      res.json({ movie });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "something went wrong" + error });
    }
  },
  getReview: async (req, res) => {
    try {
      let id = req.params?.id;
  const data = await Movie.findOne({ _id: id }).select("Review").sort({"Review.date":-1});
      res.status(200).json(data?.Review);
    } catch (error) {
      console.error(error)
     }
  },
  deleteReview: async (req, res) => {
    let date = req.params.date;
    let id = req.params.id;
    try {
      if (!id) {
        res.status(400).json({ message: "Missing id parameter" });
        return;
      }
      const review = await Movie.updateOne(
        { _id: Object(id) },
        { $pull: { Review: { date: new Date(date) } } },
        { new: true }
      );
      const updated = await Movie.findOne({ _id: Object(id) });
      res.status(200).json(updated);
    } catch (error) {
      res.status(500).json({ message: "something went wrong" + error });
    }
  },
  searchMovie: async (req, res) => {
    try {
      const movie = await Movie.find({ title: { $regex: req.params.key } });
      res.status(200).json({ message: "Sucess", movie });
    } catch (error) {
      res.status(500).json({ message: "something went wrong" + error });
    }
  },
  categorymovie: async (req, res, next) => {
    try {
      var { id: category, userId } = req.params;
      if (category === "FAVOURITE MOVIES") {
        User.findOne({ _id: userId }, "wishlist")
          .populate({
            path: "wishlist",
            model: "movies",
            select: "-Review", // Exclude the "Review" field from the populated movie objects
          })
          .exec((err, user) => {
            if (err) {
              return res.status(500).json({ error: "Internal server error" });
            }
            if (!user) {
              return res.status(404).json({ error: "User not found" });
            }
            const favoriteMovies = user.wishlist;
            res.json(favoriteMovies);
          });
      } else {
        Movie.find({ genre: category }).then((response) => {
          res.json(response);
        });
      }
    } catch (error) { }
  },
  getAllCity: async (req, res) => {
    try {
      const citys = await Theater.distinct("application.city");
      res.json({ citys });
    } catch (error) {
      res.status(500).json({ message: "something went wrong" + error });
    }
  },
  getScreenShows: async (req, res) => {
    const movieId = req.params.id;
    const movieTitle = req.params.title;

    // const releaseDate = req.params.releasedate;
    try {
      const movie = await Movie.findOne({ title: movieTitle, Available: true });

      if (!movie) {
        res.json({ data: [] }); // Movie not available
        return;
      }
      const data = await Theater.aggregate([
        {
          $match: {
            "screen.show.moviename": movieTitle,
          },
        },
        { $unwind: "$screen" },
        {
          $match: {
            "screen.show.moviename": movieTitle,
          },
        },
        {
          $project: {
            _id: 1,
            "application.theatername": 1,
            "application.city": 1, // add city field to the projection
            "screen.screenname": 1,
            showInfo: {
              $filter: {
                input: "$screen.show",
                as: "show",
                cond: {
                  $and: [{ $eq: ["$$show.moviename", movieTitle] }],
                },
              },
            },
          },
        },
        {
          $group: {
            _id: {
              theaterId: "$_id",
              applicationName: "$application.theatername",
              screenname: "$screen.screenname",
              city: "$application.city", // add city field to the group
            },
            showInfo: { $push: "$showInfo" },
          },
        },
        {
          $group: {
            _id: "$_id.applicationName",
            screens: {
              $push: {
                theaterId: "$_id.theaterId",
                screenname: "$_id.screenname",
                city: "$_id.city", // add city field to the output
                showInfo: "$showInfo",
              },
            },
          },
        },
      ]);
      res.json({ data });
    } catch (error) {
      res.status(500).json({ message: "something went wrong" + error });
    }
  },
  seatReserved: async (req, res) => {
    const id = req.params.id;

    const time = req.params.time;
    const date = req.params.date;
    const movieId = req.params.movieId;

    try {
      const data = await Reservation.find({
        // theaterId: '642284895888e345c92c3d1f',
        // startAt: '09:00',
        theaterId: id,
        startAt: time,
        movieId: movieId,
        showDate: date,
        seats: { $elemMatch: { isReserved: true } },
      });
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: "something went wrong" + error });
    }
  },
  reservation: async (req, res) => {
    console.log(req.params)
    console.log("got here")
    const { id } = req.params;
    const { total } = req.params;
    const { data: {
      ticketPrice,
      userId,
      Email,
      userName,
      showDate,
      bookedDate,
      paymentId,
      movieName,
      theaterId,
      cinemaScreen,
      startAt,
      seats,
      theaterName,
      TikectCount,
      movieId,
    },
    } = req.body;
    console.log("got here")

    try {    
      console.log("got here")

      const payment = await stripe.paymentIntents.create({
        amount: total,
        currency: "INR",
        description: "ReelRush",
        payment_method: id,
        confirm: true,
        return_url: "http://reel-rush-movie-tickets-api.vercel.app/booking",
        // return_url: "https://revolvebooks.online/booking",
      });
      console.log("got here", payment)
      const datas = await Reservation(req.body.data).save();
      
      const qrcode = await generateQR(
        "http//::3000/reservation/" + datas._id
      );
      await Reservation.findByIdAndUpdate(datas._id, {
        $set: { qrcode: qrcode },
      });

      const mailOptions = {
        from: process.env.Email,
        to: Email,
        subject: "Your Ticket Details",
        text: `
        Heyy ${userName},

        Your ticket for the movie ${movieName} has been successfully booked.

        Here are the details:

        Movie Name: ${movieName}
        Theater Name: ${theaterName}
        Cinema Screen: ${cinemaScreen}
        Show Date: ${showDate}
        Show Time: ${startAt}
        Ticket Price: ${ticketPrice}
        Number of Tickets: ${TikectCount}

        Thank you for booking your ticket with us!
      `,
        attachments: [
          {
            filename: 'qrcode.png',
            content: qrcode,
            encoding: 'base64',
          },
        ],
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          res.status(500).json({ message: "Email not sent" });
        } else {
          res.json({ status: "payment successfull", datas, qrcode });
        }
      });

    } catch (error) {
      res.status(500).json({ message: "something went wrong" + error });
    }
  },

  getQrCode: async (req, res) => {
    const { movieId } = req.params;
    try {
      Reservation.findOne(
        { movieId, qrcode: { $exists: true } },
        (err, reservation) => {
          if (err) {
            console.error(err);
            return;
          }

          if (!reservation) {
            return; 
          }

          const qrcode = reservation.qrcode;
          res.status(200).json(qrcode);

        }
      );
    } catch (error) {
      res.status(500).json({ message: "something went wrong" + error });
    }
  },
  addWishlist: async (req, res) => {
    const userId = req.body.userId;
    const { movieId } = req.body;

    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Add movieId to the wishlist array
      user.wishlist.push(movieId);

      // Save the updated user document
      const updatedUser = await user.save();
      const { wishlist } = updatedUser;
      res.status(200).json({ message: "Success", wishlist });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong", error });
    }
  },
  removeWishlist: async (req, res) => {

    const userId = req.body.userId;
    const { movieId } = req.body;

    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      // Convert movieId to string before filtering
      const stringMovieId = movieId.toString();

      // Remove the movieId from the wishlist array
      user.wishlist = user.wishlist.filter(id => id.toString() !== stringMovieId);


      // Save the updated user document
      const updatedUser = await user.save();
      const { wishlist } = updatedUser;
      res.status(200).json({ message: "Success", wishlist });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong", error });
    }
  },
  getUserHistory: async (req, res) => {
    try {
      let id = req.params.id;
      Reservation.find({ userId: id })
        .populate("movieId")
        .sort({ bookedDate: -1 })
        .exec((err, reservations) => {
          if (err) {
          } else {
            res.status(200).json(reservations);
          }
        });
    } catch (error) {
      res.status(500).json({ message: "something went wrong" + error });
    }
  },
  cancelTicket: async (req, res) => {
    let id = req.params.id;

    try {
      const data = await Reservation.findByIdAndRemove({ _id: id });

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: "something went wrong" + error });
    }
  },


};
