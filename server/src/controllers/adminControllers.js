const adminModel = require("../models/adminModel");
const theatreadminModel = require("../models/theatreadminModel");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


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
                        res.status(200).send({ msg: "user accepted" });
                    } else {
                        res.status(200).send({ msg: "user Rejected" });
                    }
                })
                .catch((err) => {
                    res.status(404).send(err);
                });
        } catch (error) {
            res.status(404).send(error);
        }
    },
  
}



