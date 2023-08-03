const userModel = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const movieModel = require("../models/movieModel")



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
                .find().sort({ "releasedate": -1 }).limit(8)
                .then((resp) => {
                    res.json(resp)
                })
                .catch((err) => {
                    res.json(err)
                })
        } catch (error) {
            res.status(404).send(error)
        }
    }
}


