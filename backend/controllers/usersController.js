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
    User.findById(req.params.userId, (err, user) => {
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
    User.findOne({ id: req.params.userId }, (err, user) => {
        if (err) {
            res.json({ status: false, message: err });
        } else {
            res.json({ status: true, data: user });
        }
    });
};

const createUser = (req, res) => {
  const newUser = new User(req.body);
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      res.json({ status: false, message: err });
    } else {
      if (user) {
        res.json({ status: false, message: "User already exists" });
      } else {
        newUser.save((err, user) => {
          if (err) {
            res.json({ status: false, message: err });
          } else { 
            res.json({ status: true, data: user });
          }
        });
      }
  }});
};

const updateUser = (req, res) => {
    User.findByIdAndUpdate(req.params.userId, req.body, (err, user) => {
        if (err) {
            res.json({ status: false, message: err });
        } else {
            res.json({ status: true, data: user });
        }
    });
};

const deleteUser = (req, res) => {
    User.findByIdAndRemove(req.params.userId, (err, user) => {
        if (err) {
            res.json({ status: false, message: err });
        } else {
            res.json({ status: true, data: user });
        }
    });
};

const addLike = (req, res) => {
    console.log(req.params.userId);
    console.log(req.body.id);

    User.findByIdAndUpdate(req.params.userId, {
        $push: { likedMe: req.body.id },
    }, function(err, result) {
        res.json(result);
    })
}

const addMatch = (req, res) => {
    User.findByIdAndUpdate(req.params.userId, {
        $push: { matches: req.body.id }
    }, function(err, result) {
        res.json(result);
    })
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addLike,
    addMatch,
};