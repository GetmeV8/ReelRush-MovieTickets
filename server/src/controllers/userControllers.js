const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const movieModel = require("../models/movieModel");
const theatreadminModel = require("../models/theatreadminModel");
const showModel = require("../models/showModel");
const bookingModel = require("../models/bookingModel");
const { createOrder } = require("../config/razorpay");



const handleErrors = (err) => {
    let errors = { email: "", password: "" }

    if (err.message === "incorrect email") {
        errors.email = "The email is not registered"
    }
    if (err.message === "incorrect passwrod") {
        errors.password = "The entered password is wrong"
    }
    if (err.code === 1100) {
        errors.email = "Email is already registered"
        return errors;
    }
    if (err.message.includes("User Validation Failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        })
    }
    return errors;
}


// Controller functions
module.exports = {
    register: async (req, res) => {
        try {
            const { email, name, password, phone } = req.body; // Access email from req.params instead of req.body
            console.log(email)
            const action = { isBlocked: false };


            // Check if the email already exists
            const existingUser = await userModel.findOne({ email: email });
            console.log("got here", existingUser)
            if (existingUser) {
                console.log("user exists")
                return res.json({ exists: true, message: 'Email already exists' });
            }

            // Create a new user
            const user = await userModel.create({
                email,
                name,
                phone,
                password,
                verified: false,
                ...action,
            });

            console.log(user);
            res.json({ user: user._id, created: true });
        } catch (err) {
            const errors = handleErrors(err);
            res.json({ errors, created: false });
        }
    },
    login: async (req, res, next) => {
        try {
            const { email, password } = req.body
            const user = await userModel.findOne({ email });
            if (user) {
                bcrypt.compare(password, user.password, function (err, result) {
                    if (result === true) {
                        if (user.isBlocked) {
                            res.status(401).json({ error: "OOPS!!! you are Blocked" });
                        }
                        //  else if (!user.verified) {
                        //     res.status(401).json({ error: "User Not Verified." })
                        // } 
                        else {
                            const token = jwt.sign({ email }, "secret");
                            res.json({ created: true, data: { access: token, refresh: "" } });
                            console.log("yaaay passwords match");
                            // res.status(200).send({message:"user logged in"})
                        }
                    } else {
                        res.status(401).json({ error: "Invalid Email or Password " })
                    }
                })
            } else {
                res.status(401).json({ error: "Invalid email or password" })
            }

        } catch (error) {
            console.log(error);
            res.send(error)

        }
    },
    verify: (req, res, next) => {
        let number = req.body.number.split("+91")[1];

        userModel
            .updateOne({ phone: number }, { $set: { verified: req.body.verified } })
            .then((resp) => {
                if (resp.matchedCount > 0) {
                    res.status(200).send({ verified: true, resp });
                } else if (resp.modifiedCount === 0 || resp.matchedCount === 0) {
                    res.status(200).send({ err: "Not Verified", resp });
                }
            })
            .catch((err) => {
                res.status(500).send(err);
            });
    },
    newrelease: async (req, res, next) => {
        try {
            movieModel
                .find({ $or: [{ isBlocked: { $exists: false } }, { isBlocked: false }] }).sort({ "releasedate": -1 }).limit(8)
                .then((resp) => {
                    res.json(resp)
                    // console.log(resp)
                })
                .catch((err) => {
                    res.json(err)
                })
        } catch (error) {
            res.status(404).send(error)
        }
    },
    singleMovie: async (req, res, next) => {
        try {
            movieModel.findOne({ _id: req.params.id }).then((resp) => {
                res.json(resp);
            });
        } catch (error) {
            console.log(error);
        }
    },
    findtheatre: async (req, res, next) => {
        const MovieId = req.params.id;
        try {
            theatreadminModel.find({ "screens.shows.MovieID": MovieId }).then(
                (resp) => {
                    // console.log(resp);
                    res.json(resp);
                }
            );
        } catch (error) {
            console.log(error)
        }
    },
    findShow: async (req, res, next) => {
        const id = req.params.id;
        try {
            showModel.find({ "Movie._id": id }).then((resp) => {
                res.status(200).send(resp);
            });
        } catch (error) {
            res.status(404).send(error);
        }
    },
    seatusage: async (req, res, next) => {
        try {
            const date = req.body.date.split("T")[0];
            let screenseats = await showModel.findOne(
                { "theater.screen._id": req.body.screen_id },
                { "theater.screen": true }
            );
            bookingModel.find(
                {
                    "show.date": new Date(date),
                    "show.time": req.body.time,
                    "theater.screen._id": req.body.screen_id,
                },
                { show: true, theater: true }
            ).then((resp) => {
                let seats = [];
                resp.map((value) => {
                    seats.push(...value.show.SeatNumber);
                });
                res.status(200).send({ seats, screenseats });
            });
        } catch (error) {
            res.status(404).send(error);
        }
    },
    seatbooking: async (req, res, next) => {
        const { email } = req.user;
        try {
            bookingModel.create({
                BookingDate: req.body.BookingDate.split("T")[0],
                CompletePayment: false,
                user: {
                    email: email,
                },
                show: {
                    date: req.body.show.date.split("T")[0],
                    time: req.body.show.time,
                    SeatNumber: req.body.show.SeatNumber,
                    price: req.body.show.price,
                    TotalPrice: req.body.show.TotalPrice,
                },
                movie: req.body.movie,
                theater: req.body.theater,
            })
                .then((resp) => {
                    console.log(resp);
                    res.status(200).send(resp);
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (error) {
            console.log(error);
            res.status(404).send(error);
        }
    },
    order: async (req, res, next) => {
        try {
            const { email } = req.user;
            const { amount } = req.body;

            // Assuming createOrder is a function that creates the order
            const createdOrder = await createOrder(amount);

            // Add userEmail and userName properties to the created order
            createdOrder.userEmail = email;
            createdOrder.userName = email.split("@")[0];

            // Send the order as the response
            res.send(createdOrder);
        } catch (error) {
            // Handle any errors that occurred during order creation
            console.error(error);
            res.status(500).json({ error: 'Failed to create the order' });
        }
    },
    confirmPayment: async (req, res, next) => {
        try {
            const { email } = req.user;
            const { bookingid } = req.body;   

            // Find the booking details for the given email
            const details = await bookingModel.find({ 'user.email': email });

            // Update the booking with the given bookingid to mark it as CompletePayment
            const response = await bookingModel.updateOne({ _id: bookingid }, { CompletePayment: true });

            // Send the response with status 200 and data
            res.status(200).json({ response, details });
        } catch (error) {
            // Handle any errors that occurred during payment confirmation
            console.error("Error confirming payment:", error);
            res.status(500).json({ error: 'Failed to confirm the payment' });
        }
    },

}


