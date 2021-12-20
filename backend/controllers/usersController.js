const User = require("../models/userModel");
const DB = require("../data/index");

const getAllUsers = (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            console.log(err)
            res.json({ status: false, message: err });
        } else {
            res.json({ status: true, data: users });
        }
    });
};

const getUserById = (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) {
            res.json({ status: false, message: err });
        } else {
            if (user) {
                res.json({ status: true, data: user });
            } else {
                res.json({ status: false, message: 'User not found' });
            }
        }
    });
};

const getUserById_not_in_use = (req, res) => {
    User.findOne({ id: req.params.id }, (err, user) => {
        if (err) {
            res.json({ status: false, message: err });
        } else {
            res.json({ status: true, data: user });
        }
    });
};

const createUser = (req, res) => {

    console.log(`create user req.body: ${req}`);
    console.log(req);
    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            res.json({ status: false, message: err });
        } else {

            res.json({ status: true, data: user });
        }
    });

};

const updateUser = (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
        if (err) {
            res.json({ status: false, message: err });
        } else {
            res.json({ status: true, data: user });
        }
    });
};

const deleteUser = (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, user) => {
        if (err) {
            res.json({ status: false, message: err });
        } else {
            res.json({ status: true, data: user });
        }
    });
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};