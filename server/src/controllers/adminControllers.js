const adminModel = require("../models/adminModel");
const theatreadminModel = require("../models/theatreadminModel");
const movieModel = require('../models/movieModel');
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { response } = require("express");


const handleErrors = (err) => {
    let errors = { email: "", password: "" };

    if (err.code === 11000) {
        errors.email = "Email is already registered";
        return errors;
    }
};


module.exports = {
    adminLogin: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            console.log(email, password);
            const admin = await adminModel.findOne({ email });
            console.log(admin);
            console.log(req.body)
            if (admin) {
                console.log(req.body)
                bcrypt.compare(password, admin.password, function (err, result) {
                    if (result === true) {
                        const token = jwt.sign({ email }, "secret");
                        res.json({ token });
                        console.log("Admin passwords matchhh")
                    } else {
                        res.status(404).json({ error: "Invalid Email or Password" });
                        console.log("Passwords Do Not Match");
                    }
                });
            } else {
                res.status(401).json({ error: "invalid Email or passoworddd" });
            }
        } catch (error) {
            console.log(error);
        }
    },
    getAllData: async (req, res, next) => {
        try {
            const [users, theatres, movies] = await Promise.all([
                userModel.find({}, { password: 0 }),
                theatreadminModel.find({}, { password: 0 }),
                movieModel.find({}),
            ]);
            res.status(200).json({ users, theatres, movies });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Something went wrong" });
        }
    },

    allUsers: async (req, res, next) => {
        try {
            userModel.find({}, { password: 0 }).then((resp) => {
                res.status(200).send(resp);
                console.log(resp);
            });
        } catch (error) {
            res.status(404).send(error);
        }
    },
    editUser: async (req, res, next) => {
        const { _id, phone, email } = req.body;
        console.log(req.body);
        try {
            userModel
                .updateOne({ _id: _id }, { phone: phone, email: email })
                .then((resp) => {
                    res.status(200).send({ msg: `user updated ${email}` });
                });
        } catch (error) {
            res.status(404).send(error);
        }
    },
    blocking: async (req, res, next) => {
        const id = req.params.id;
        console.log(req.body);
        try {
            userModel
                .updateOne({ _id: req.body.userid }, { isBlocked: req.body.status })
                .then((resp) => {
                    console.log(resp);
                    res.status(200).send({ msg: `user Blocked`, status: req.body.status });
                })
                .catch((err) => {
                    res.status(404).send(err);
                });
        } catch (error) {
            res.status(404).send(error);
        }
    },
    addUser: async (req, res, next) => {
        try {
            const { email, name, phone, password, } = req.body;
            const user = await userModel.create({ email, name, phone, password });
            res.send({ created: true });
        } catch (error) {
            const errors = handleErrors(error);
            res.json({ errors, created: false });
        }
    },
    allTheatres: async (req, res) => {
        try {
            theatreadminModel.find({}, { password: 0 }).then((resp) => {
                res.status(200).send(resp);
            });
        } catch (error) {
            res.status(404).send(error);
        }
    },
    theatreAccept: async (req, res) => {
        try {
            const { email, status } = await req.body;

            theatreadminModel.updateOne({ email: email }, { accepted: status })
                .then((resp) => {
                    if (status) {
                        res.status(200).send({ message: "user accepted" });
                    } else {
                        res.status(200).send({ message: "user Rejected" });
                    }
                })
                .catch((err) => {
                    res.status(404).send(err);
                });
        } catch (error) {
            res.status(404).send(error);
        }
    },
    addMovie: async (req, res, next) => {
        try {
            const {
                moviename,
                releasedate,
                description,
                posterUrl1,
                posterUrl2,
                posterUrl3,
                trailerlink,
                genre,
                language,
            } = req.body;
    
            // Check if the movie already exists in the database
            const existingMovie = await movieModel.findOne({ moviename });
    
            if (existingMovie) {
                // Movie already exists, return an error response
                return res.status(409).json({ success: false, error: "Movie already exists" });
            }
    
            // Movie does not exist, add it to the database
            const movie = {
                moviename,
                releasedate: new Date(releasedate),
                description,
                poster1: posterUrl1,
                poster2: posterUrl2,
                poster3: posterUrl3,
                genre,
                language,
                trailerlink,
            };
    
            const createdMovie = await movieModel.create(movie);
            return res.status(201).json({ success: true, message: "Movie Added successfully", movie: createdMovie });
        } catch (error) {
            console.error("00000", error); // Log the error for debugging purposes
            return res.status(500).json({ success: false, error: "Something went wrong" });
        }
    },
    
    // addMovie: async (req, res, next) => {
    //     try {
    //         const {
    //             moviename,
    //             releasedate,
    //             description,
    //             posterUrl1,
    //             posterUrl2,
    //             posterUrl3,
    //             trailerlink,
    //             genre,
    //             language,
    //         } = req.body;
    //         const movie = {
    //             moviename,
    //             releasedate: new Date(releasedate), // Parse the date correctly
    //             description,
    //             poster1: posterUrl1,
    //             poster2: posterUrl2,
    //             poster3: posterUrl3,
    //             genre,
    //             language,
    //             trailerlink,
    //         };
    //         const createdMovie = await movieModel.create(movie);
    //         res.send({ success: true, message: "Movie Added successfully", movie: createdMovie });
    //     } catch (error) {
    //         console.error("00000", error); // Log the error for debugging purposes
    //         res.status(500).send({ success: false, error: "Something went wrong" });
    //     }
    // },
    allMovies: async (req, res, next) => {
        try {
            await movieModel.find({}).then((response => {
                res.status(200).send(response);
            }))
        } catch (error) {
            console.log(error)
        }
    },
    editMovies: (req, res, next) => {
        const {
            moviename,
            releasedate,
            description,
            posterUrl1,
            posterUrl2,
            posterUrl3,
            trailerlink,
            genre,
            language,
        } = req.body;
        const movie = {
            moviename,
            releasedate: new Date(releasedate), // Parse the date correctly
            description,
            poster1: posterUrl1,
            poster2: posterUrl2,
            poster3: posterUrl3,
            genre,
            language,
            trailerlink,
        }
        try {
            movieModel.updateOne({ _id: req.body._id }, { ...movie }).then((resp) => {
                res.json(resp)
            }).catch((err) => {
                res.json(err)
            })
        } catch (error) {
            console.log(error)
        }
    },
    movieBlock: (req, res, next) => {
        try {
            const { id, isBlocked } = req.query;
            console.log(id, isBlocked)
            movieModel.updateOne({ _id: id }, { isBlocked: isBlocked }).then((resp) => {
                console.log(resp)
            }).catch((err) => {
                console.log(err)
            })
        } catch (error) {
            console.log(error);
        }
    }


}



